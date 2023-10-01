import { BlogPost } from "../models/BlogPost.js";

export const getAllBlogs = async (req, res) => {

    const blogs = await BlogPost.find({})

    res.json({
        message: "Success",
        blogs,
    })
}
export const getSingleBlog = async (req, res) => {

    let blog = await BlogPost.findById(req.params.id)

    res.json({
        message: "Success",
        blog,
    })
}

export const postBlog = async (req, res) => {

    const { title, description } = req.body;

    console.log(req.body)

    await BlogPost.create({
        title: title,
        description: description,
    })

    res.json({
        message: "Blog Posted successfully"
    })
}

export const deleteBlog = async (req, res) => {

    let blog = await BlogPost.findByIdAndDelete(req.params.id)

    res.json({
        message: "Blog deleted successfully"
    })
}

export const updateBlog = async (req, res) => {

    let blog = await BlogPost.findByIdAndUpdate(req.params.id)

    if (!blog) {
        res.json({ message: "Blog not found" })
    }

    if (!req.body.title && !req.body.description) {
        res.json({ message: "please Provide valid title and des" })
    } else if (!req.body.title) {
        blog.description = req.body.description;
    } else if (!req.body.description) {
        blog.title = req.body.title;
    } else {
        blog.title = req.body.title;
        blog.description = req.body.description;
    }

    await blog.save();

    res.json({
        message: "Blog updated successfully"
    })
}