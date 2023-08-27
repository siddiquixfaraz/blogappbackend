import express from "express";
import { connectDb } from "./data/database.js";
import { BlogPost } from "./models/BlogPost.js";
import cors from "cors";
import { config } from "dotenv";



const app = express();

config({
    path: './data/config.env'
})

//Middleware
app.use(express.json());
app.use(cors())

connectDb();


// console.log(process.env.MONGO_URI)


//Routes

app.get("/get-blog",async (req,res)=>{

  const blogs = await BlogPost.find({})

    res.json({
        message: "Success",
        blogs,
    })
})

app.post("/post-blog",async (req,res)=>{

    const {title,description} = req.body;

    console.log(req.body)
    
    await BlogPost.create({
        title: title,
        description: description,
    })
   
    res.json({
        message: "Blog Posted successfully" 
    })
})

app.delete("/delete-blog/:id",async (req,res)=>{

    let blog = await BlogPost.findByIdAndDelete(req.params.id)

    
   
    res.json({
        message: "Blog deleted successfully" 
    })
})
app.put("/update-blog/:id",async (req,res)=>{

    let blog = await BlogPost.findByIdAndUpdate(req.params.id)

    if(!blog){
        res.json({message:"Blog not found"})
    }

    if(!req.body.title && !req.body.description){
        res.json({message:"please Provide valid title and des"})
    }else if(!req.body.title){
        blog.description= req.body.description;
    }else if(!req.body.description){
        blog.title = req.body.title;
    }else{
        blog.title = req.body.title;
        blog.description= req.body.description;
    }

    await blog.save();
    
   
    res.json({
        message: "Blog updated successfully" 
    })
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
})