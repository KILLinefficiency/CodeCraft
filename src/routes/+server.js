import mongoose from "mongoose";
import { json } from "@sveltejs/kit";

import User from "$lib/schemas/users.js";

export async function POST({ request }) {
    await mongoose.connect("mongodb://127.0.0.1:27017/project");
    const { username, password } = await request.json();
    const exists = await User.find({ username }, { _id: 0 }).exec();
    if(exists.length == 0) {
        return json({ status: "noUser" });
    }
    else if(password === exists[0].password) {
        return json({ status: "success" });
    }
    return json({ status: "fail" });
}