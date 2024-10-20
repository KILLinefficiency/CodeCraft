import mongoose from "mongoose";
import Problem from "$lib/schemas/problems.js";

import { json } from "@sveltejs/kit";

export async function GET() {
    await mongoose.connect("mongodb://127.0.0.1:27017/project");
    const problems = await Problem.find({}, { _id: 0, problemID: 1 }).exec();
    const count = problems.length;
    return json({ count });
}

export async function POST({ request }) {
    await mongoose.connect("mongodb://127.0.0.1:27017/project");
    const data = await request.json();
    const newProblem = Problem(data);
    await newProblem.save();
    return json({ status: "success" });
}