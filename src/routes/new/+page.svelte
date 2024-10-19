<script>
    import Appbar from "$lib/Appbar.svelte";
    import { getToastStore } from "@skeletonlabs/skeleton";
    const toast = getToastStore();

    const submittedBy = localStorage.getItem("codeCraftUser");
    let problem = "";
    let testcases = [];
    let newTestCase = "";

    function deleteCase(index) {
        testcases = [...testcases.slice(0, index), ...testcases.slice(index + 1)];
    }

    function addNew() {
        if(newTestCase !== "") {
            testcases.push(newTestCase);
            testcases = testcases;
            newTestCase = "";
        }
    }

    function submit() {
        fetch("/new", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ submittedBy, problem, testcases })
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
    }
    .add {
        display: grid;
        grid-template-columns: repeat(2, 50%);
        gap: 50px;
    }
    textarea {
        width: 1000px;
        height: 500px;
    }
    .case {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .each {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>

<Appbar user={submittedBy} />

<div class = "main">
    <textarea bind:value={problem} />
    <div class = "add">
        <div class = "each">
            {#if testcases.length === 0}
                <h1 class = "p-4">Testcases...</h1>
            {/if}
            {#each testcases as test, idx}
                <div class = "case">
                    <div class = "card variant-filled-primary p-4">{test}</div>
                    <button class = "btn variant-filled-error p-4" on:click = { () => deleteCase(idx) }>Delete</button>
                </div>
            {/each}
        </div>
        <div class = "main">
            <input bind:value={newTestCase} />
            <button class = "btn variant-filled-primary" on:click={addNew}>Add Testcase</button>
            <button class = "btn variant-filled-success" on:click={submit}>Submit</button>
        </div>
    </div>
</div>