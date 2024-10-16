import mongoose from "mongoose";
import { json } from "@sveltejs/kit";

import User from "$lib/schemas/users.js";

export async function POST({ request }) {
    const { username, password } = await request.json();
    if(username === "" || password == "") {
        return json({ status: "empty" });
    }
    await mongoose.connect("mongodb://127.0.0.1:27017/project");
    const exists = await User.find({ username }, { _id: 0, username: 1 }).exec();
    if(exists.length != 0) {
        return json({ status: "exists" });
    }
    const newUser = User({ username, password });
    await newUser.save();
    return json({ status: "success" });
}