<script>
    import { onMount } from "svelte";

    import CodeMirror from "svelte-codemirror-editor";
    import { python } from "@codemirror/lang-python";
    import { oneDark } from "@codemirror/theme-one-dark";

    let code = "";

    import Appbar from "$lib/Appbar.svelte";
    const user = localStorage.getItem("codeCraftUser");
    export let data;

    let problem = [];
    let testcases = [];
    onMount(() => {
        fetch(`/editor/${data.id}`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: data.id })
        })
        .then(response => response.json())
        .then(body => {
            console.log(body);
            problem = body;
            testcases = body.testcases;
        });
    });
</script>

<style>
    .main {
        display: grid;
        grid-template-columns: repeat(2, 50%);
    }
    h1 {
        padding: 40px;
        color: white;
        font-size: 30px;
    }
    h2 {
        padding: 40px;
        color: white;
        font-size: 20px;
    }
    .buttons {
        display: flex;
        flex-direction: row;
        gap: 20px;
        justify-content: center;
        align-items: center;
        padding: 20px 0px;
    }
    button {
        width: 95px;
    }
    .cases {
        margin: 20px 0px;
        display: flex;
        flex-direction: row;
        gap: 20px;
    }
    .each-case {
        @apply variant-filled-primary;
    }
</style>

<Appbar {user} />

<div class = "main">
    <div>
        <h1>{problem.title}</h1>
        <h2>{problem.problem}</h2>
    </div>

    <div>
        <CodeMirror
            bind:value={code}
            lang={ python() } 
            theme={ oneDark }
            styles={{
                "&": {
                    width: "100%",
                    height: "60vh"
                }
            }}
        />
        <div class = "buttons">
            <button class = "btn variant-filled-primary">Run</button>
            <button class = "btn variant-filled-success">Submit</button>
        </div>
        <div class = "cases">
            {#each testcases as eachCase, idx}
                <div class = "each-case p-4">{idx + 1}. Pending</div>
            {/each}
        </div>
    </div>
</div>