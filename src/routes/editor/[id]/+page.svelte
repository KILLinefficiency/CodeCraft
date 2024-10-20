<script>
    import { onMount } from "svelte";

    import Appbar from "$lib/Appbar.svelte";
    const user = localStorage.getItem("codeCraftUser");
    export let data;

    let problem = [];
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
        });
    });
</script>

<style>
    h1 {
        color: white;
        font-size: 30px;
    }
</style>

<Appbar {user} />

<h1>{problem.title}</h1>