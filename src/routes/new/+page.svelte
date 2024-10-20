<script>
    import { onMount } from "svelte";
    import Appbar from "$lib/Appbar.svelte";
    import { getToastStore } from "@skeletonlabs/skeleton";
    const toast = getToastStore();

    const submittedBy = localStorage.getItem("codeCraftUser");
    let title = "";
    let problem = "";
    let testcases = [];
    let newStdin = "";
    let newStdout = "";

    let problemID = 0;
    onMount(() => {
        fetch("/new", {
            method: "GET",
            mode: "cors"
        })
        .then(response => response.json())
        .then(body => {
            problemID = body.count + 1;
        });
    });

    function deleteCase(index) {
        testcases = [...testcases.slice(0, index), ...testcases.slice(index + 1)];
    }

    function addNew() {
        if(newStdin !== "" && newStdout !== "") {
            testcases.push({ stdin: newStdin, stdout: newStdout });
            testcases = testcases;
            newStdin = "";
            newStdout = "";
        }
    }

    function submit() {
        fetch("/new", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ submittedBy, problemID, title, problem, testcases })
        })
        .then(response => response.json())
        .then(body => {
            if(body.status === "success") {
                toast.trigger({ message: "Problem added successfully.", background: "variant-filled-success" });
            }
        });
    }
</script>

<style>
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 15px 0px;
        background-color: #3C4653;
    }
    h1 {
        color: white;
    }
    .add {
        display: grid;
        grid-template-columns: repeat(2, 50%);
        gap: 100px;
    }
    textarea {
        width: 1000px;
        height: 300px;
        color: black;
        padding: 10px;
        border-radius: 20px;
    }
    input {
        color: black;
        padding: 10px;
        border-radius: 20px;
    }
    .title {
        width: 500px;
    }
    .case {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }
    .each {
        display: flex;
        flex-direction: column;
        gap: 40px;
    }
    button {
        width: 225px;
    }
    .heading {
        color: white;
        font-size: 50px;
        padding: 20px;
    }
</style>

<Appbar user={submittedBy} />

<div class = "main card">
    <h1 class = "heading">Add a new problem.</h1>
    <input class = "title" placeholder="Title of the problem" bind:value={title} />
    <textarea placeholder="Write your problem description here..." bind:value={problem} />
    <div class = "add">
        <div class = "each">
            {#if testcases.length === 0}
                <h1 class = "p-4">No Testcases Added</h1>
            {/if}
            {#each testcases as test, idx}
                <div class = "case card variant-filled-primary p-2">
                    <p><strong>Input:</strong> {test.stdin}</p>
                    <p><strong>Output:</strong> {test.stdout}</p>
                    <button class = "btn variant-filled-error delete" on:click = { () => deleteCase(idx) }>Delete</button>
                </div>
            {/each}
        </div>
        <div class = "main">
            <input placeholder="Input (STDIN)" bind:value={newStdin} />
            <input placeholder="Output (STDOUT)" bind:value={newStdout} /> 
            <br /><br />
            <button class = "btn variant-filled-primary" on:click={addNew}>Add Testcase</button>
            <button class = "btn variant-filled-success" on:click={submit}>Submit</button>
        </div>
    </div>
</div>