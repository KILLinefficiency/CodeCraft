import mongoose from "mongoose";
import Problem from "$lib/schemas/problems.js";
import { json } from "@sveltejs/kit";

export async function GET() {
    await mongoose.connect("mongodb://127.0.0.1:27017/project");
    const problems = await Problem.find({}, { _id: 0, testcases: 0 });
    return json(problems);
}