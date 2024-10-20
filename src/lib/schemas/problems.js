import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    title: String,
    submittedBy: String,
    problemID: Number,
    problem: String,
    testcases: [{
        stdin: String,
        stdout: String
    }]
});

const Problem = mongoose.model("problems", problemSchema);

export default Problem;