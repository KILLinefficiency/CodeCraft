import mongoose from "mongoose";
import Problem from "$lib/schemas/problems.js";

import { json } from "@sveltejs/kit";

export async function POST({ request }) {
    await mongoose.connect("mongodb://127.0.0.1:27017/project");
    const problemData = await request.json();
    let problem = await Problem.find({ problemID: problemData.id }, { _id: 0 });
    if(problem.length != 0) {
        problem = problem[0];
    }
    return json(problem);
}