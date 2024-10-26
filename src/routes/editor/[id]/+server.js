import mongoose from "mongoose";
import Problem from "$lib/schemas/problems.js";

import { json } from "@sveltejs/kit";

import { spawnSync } from "child_process";

//spawnSync("docker", ["run", "-d", "-i", "-p", "3000:3000", "codecraft"]);

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
    const { id, code, user } = await request.json();
    let testcases = await Problem.find({ problemID: id }, { _id: 0, testcases: 1 });
    testcases = testcases.map(each => each.testcases)[0];

    let metadata = { id, code, user, testcases };
    console.log("Start...");
    spawnSync("docker", ["run", "-d", "--rm", "-i", "-p", "3000:3000", "codecraft"]);
    console.log("Done!");

    const stdoutRequest = await fetch("http://127.0.0.1:3000/", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(metadata),
    });
    const stdoutResponse = await stdoutRequest.json();

    console.log(stdoutResponse);
    return json(stdoutResponse);
}