const fs = require("fs");
const express = require("express");
const cors = require("cors");
const { spawnSync } = require("child_process");

const app = express()
app.use(express.json())
app.use(cors())

const port = 3000;

const dirName = "./solutions";
if(!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName);
}

app.post("/", (req, res) => {
    let caseStatus = {};
    const testcases = req.body.testcases;
    const filePath = `./solutions/${req.body.id}_${req.body.user}.py`;
    fs.writeFileSync(filePath, req.body.code);

    for(let each = 0; each < testcases.length; each++) {
        const runProgram = spawnSync("python3", [filePath], { input: testcases[each].stdin })
        const userStdout = String(runProgram.stdout).trim();
        caseStatus[each + 1] = (userStdout === testcases[each].stdout) ? "Passed" : "Failed";
    }

    res.send(caseStatus);
    process.exit();
});

app.listen(port, () => {
    console.log("Sandbox environment listening on 127.0.0.1:3000...");
})