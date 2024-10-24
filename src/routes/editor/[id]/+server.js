import mongoose from "mongoose";
import Problem from "$lib/schemas/problems.js";

import { json } from "@sveltejs/kit";

import { writeFileSync, existsSync, mkdirSync } from "fs";
import { spawnSync } from "child_process";

export async function POST({ request }) {
    await mongoose.connect("mongodb://127.0.0.1:27017/project");
    const problemData = await request.json();
    let problem = await Problem.find({ problemID: problemData.id }, { _id: 0 });
    if(problem.length != 0) {
        problem = problem[0];
    }
    return json(problem);
}

export async function PUT({ request }) {
    await mongoose.connect("mongodb://127.0.0.1:27017/project");
    const solution = await request.json();
    let testcases = await Problem.find({ problemID: solution.id }, { _id: 0, testcases: 1 });
    testcases = testcases.map(each => each.testcases)[0];
    const dirName = "solutions";
    const file = `${solution.id}_${solution.user}.py`;
    if(!existsSync(dirName)) {
        mkdirSync(dirName);
    }
    const filePath = `${dirName}/${file}`;
    writeFileSync(filePath, solution.code);

    let caseStatus = {};

    for(let each = 0; each < testcases.length; each++) {
        console.log(filePath);
        const runProgram = spawnSync("docker", ["run", "--rm", "-i", "codecraft", "py", filePath ], { input: testcases[each].stdin });
        //const runProgram = spawnSync("python3", [filePath], { input: testcases[each].stdin })
        console.log(String(runProgram.stderr));
        const userStdout = String(runProgram.stdout).trim();
        console.log(userStdout);
        caseStatus[each + 1] = (userStdout === testcases[each].stdout) ? "Passed" : "Failed";
    }
    console.log(caseStatus);
    return json(caseStatus);
}