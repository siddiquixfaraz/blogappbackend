import express from "express";
import { connectDb } from "./data/database.js";
import cors from "cors";
import { config } from "dotenv";
import router from "./routes/blogRoutes.js";

const app = express();

config({
    path: './data/config.env'
})

//Middleware
app.use(express.json()); //its position is important
app.use(router)
app.use(cors())


connectDb();

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT ${process.env.PORT}`)
})