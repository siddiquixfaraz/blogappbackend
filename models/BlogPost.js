import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
    title: String,
    description: String,
});


export const BlogPost = mongoose.model("BlogPost",blogPostSchema);