<script>
    import { getToastStore } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";
    const toast = getToastStore();

    let username = "";
    let password = "";

    function signup() {
        fetch("/signup", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(body => {
            if(body.status === "success") {
                toast.trigger({ message: `Account ${username} created.`, background: "variant-filled-success" });
                localStorage.setItem("codeCraftUser", username);
                goto(`/user/${username}`);
            }
            else if(body.status === "exists") {
                toast.trigger({ message: `Username ${username} already exists.`, background: "variant-filled-error" });
            }
            else if(body.status === "empty") {
                toast.trigger({ message: "Username or Password fields cannot be empty.", background: "variant-filled-warning" });
            }
        });
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Solway:wght@300;400;500;700;800&display=swap');
    .split {
        display: grid;
        grid-template-columns: repeat(2, 50%);
    }
    .main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .signup {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    input {
        width: 400px;
        height: 42px;
        padding: 5px;
        color: #313944;
    }
    h1 {
        font-size: 40px;
        text-align: center;
        padding: 20px;
    }
    .hr {
        border-top: 2px solid #313944;
        margin: 15px 0px;
    }
    .image {
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("login_bg.jpg");
        background-size: cover;
        background-repeat: no-repeat;
    }
    .title {
        position: absolute;
        top: 60px;
        color: white;
        font-size: 60px;
        font-family: "Solway", serif;
    }
    .subtitle {
        color: white;
        font-family: "Solway", serif;
    }
    p {
        font-size: 120px;
    }
    .gap {
        margin: 70px 0px;
    }
</style>

<div class = "split">
    <div class = "image">
        <h1 class = "title">CodeCraft</h1>
        <div class = "hr-white"></div>
        <h1 class = "subtitle">
            Transform Your
            <div class = "gap"></div>
            <p>Coding</p>  
            <div class = "gap"></div>
            Career
        </h1>
        <div class = "hr-white"></div>
    </div>
    <div class = "card bg-gradient-to-br variant-gradient-secondary-tertiary main">
        <div class = "signup">
            <h1>Signup</h1>
            <input placeholder="Username" bind:value={username} />
            <input placeholder="Password" type="password" bind:value={password} />
            <button class = "btn variant-filled" on:click={signup}>Signup</button>
            <div class = "hr"></div>
            <a class = "btn variant-filled" href = "/">Login</a>
        </div>
    </div>
</div>