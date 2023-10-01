import express from "express";
import { deleteBlog, getAllBlogs, getSingleBlog, postBlog, updateBlog } from "../controllers/blogController.js";

const router = express.Router();

router.get("/get-blog",getAllBlogs)

router.get("/get-single-blog/:id",getSingleBlog)
  
router.post("/post-blog",postBlog)
  
router.delete("/delete-blog/:id",deleteBlog)

router.put("/update-blog/:id",updateBlog)
  

export  default router;