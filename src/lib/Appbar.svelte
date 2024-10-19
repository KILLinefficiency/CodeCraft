<script>
    export let user = "";

    function logout() {
        localStorage.removeItem("codeCraftUser");
    }
</script>

<style>
    h1 {
        color: black;
        font-size: 30px;
    }
    .navbar {
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
    }
</style>

<div class = "navbar bg-primary-500">
    <h1>CodeCraft</h1>
    <div class="inner-navbar">
        <h1>A</h1>
        <h1>B</h1>
        <h1>C</h1>
    </div>
    <div>
        <span>{user}</span>
        <button class = "btn variant-filled-tertiary">Log Out</button>
    </div>
</div>