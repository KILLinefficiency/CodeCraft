<script>
    import { goto } from "$app/navigation";
    export let user = "";

    function logout() {
        localStorage.removeItem("codeCraftUser");
        goto("/");
    }
</script>

<style>
    .title {
        font-size: 30px;
        padding-left: 20px;
    }
    .navbar {
        color: black;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
    }
    button {
        height: 60px;
    }
    .inner-navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 40px;
        font-size: 20px;
    }
    span {
        padding: 0px 20px;
    }
</style>

<div class = "navbar bg-primary-500">
    <h1 class = "title">CodeCraft</h1>
    <div class="inner-navbar">
        <h1><a href={`/user/${user}`}>Home</a></h1>
        <h1><a href="/new">New</h1>
        <h1><a href="/about">About</a></h1>
    </div>
    <div>
        <span>{user}</span>
        <button class = "btn variant-filled-tertiary" on:click={logout}>Log Out</button>
    </div>
</div>