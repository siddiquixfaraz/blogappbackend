import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
    title: String,
    description: String,
    photo: {
        type: String,
        required: false,
    },

}
, { timestamps: true });


export const BlogPost = mongoose.model("BlogPost",blogPostSchema);