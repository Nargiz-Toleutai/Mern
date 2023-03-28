import express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import fileUpload from "express-fileupload";

import authRouter from "./routes/auth.js";
import postRouter from "./routes/posts.js";
import commentRouter from "./routes/comments.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);


async function start() {
    try{
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@mern-cluster.mvrpxjs.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`);
        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`);
        })
    } catch (error){
        console.log(error);
    }
}

start();




