<script>
    export let data;
    import Homepage from "./Homepage.svelte";

    const cachedUser = localStorage.getItem("codeCraftUser");
</script>

{#if cachedUser === data.user}
    <Homepage user={data.user} />
{/if}