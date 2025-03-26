<script>
    import { onMount, onDestroy } from "svelte";
    import Appbar from "$lib/Appbar.svelte";
    import Cal from "$lib/Cal.svelte";
    export let user = "";

    let problems = [];
    let interval = null;
    onMount(() => {
        interval = setInterval(() => {
            fetch(`/user/${user}`, {
                method: "GET",
                mode: "cors",
            })
            .then(response => response.json())
            .then(data => {
                if(problems !== data) {
                    problems = data;
                }
            });
        }, 1000);
    });

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<style>
    .main {
        color: white;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    tr, td {
        padding: 20px;
        font-size: 30px;
    }

    tr {
        margin: 20px 0px;
    }

    table {
        margin-top: 50px;
    }

    tr:nth-child(even) {
        @apply variant-ghost-primary;

    }
    tr:nth-child(odd) {
        @apply variant-ghost-secondary;
    }

    .cal {
        position: absolute;
        top: 20%;
        right: 10%;
    }
</style>

<Appbar {user} />

<div class = "main">
    <table>
        {#each problems as problem}
            <tr>
                <td>{problem.problemID}.</td>
                <td><a href={`/editor/${problem.problemID}`}>{problem.title}</a></td>
            </tr>
        {/each}
    </table>
    <div class = "cal">
        <Cal />
    </div>
</div>