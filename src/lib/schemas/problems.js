import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    submittedBy: String,
    problem: String,
    testcases: [String]
});

const Problem = mongoose.model("problems", problemSchema);

export default Problem;