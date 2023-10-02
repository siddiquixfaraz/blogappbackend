import express from "express";
import { connectDb } from "./data/database.js";
import cors from "cors";
import { config } from "dotenv";
import router from "./routes/blogRoutes.js";
import multer from "multer"

const app = express();

config({
    path: './data/config.env'
})

//Middleware
app.use(express.json()); //its position is important
app.use(cors())
app.use(router)
// app.use(cors())


connectDb();

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"images")
    },
    filename: (req,file,cb)=>{
        cb(null,req.body.name)
    }
})

const upload = multer({storage: storage})

app.post("/upload", upload.single("file"),(req,res)=>{
    res.status(200).json({message:"file uploaded"})
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
})