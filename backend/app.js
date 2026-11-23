import express from "express"
import { ConnectDB } from "./configs/db.js";
import User from "./Models/User.js"; 
import dotenv from "dotenv"
import authRouter from "./routes/authRoutes.js"; 
import userRouter from "./routes/userRoutes.js";
import connectionRouter from "./routes/connectionRouter.js"
import postRouter from "./routes/postRouter.js";
import cookieParser from "cookie-parser";
import cors from "cors";



dotenv.config();           // Access environment variables


const app = express()          // Application object or references that manage server
app.use(express.json())        // Convert json file to js file and js file to json file
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials: true
}))
app.use(cookieParser())

// /auth/signup
app.use("/auth", authRouter)    
app.use("/user", userRouter)
app.use("/connection",connectionRouter)
app.use("/post", postRouter)
// app.use("/product", productRouter)

   


const port = process.env.PORT;
ConnectDB()
    .then(() => 
        {
            // If database connected then run application
            app.listen(port, ()=>{console.log("Server running on port : "+port)});       //  Run application using port number
            console.log("Database connected successfully✅ !!")
        })
    .catch((err) =>{
        console.log("Connection failed with mongoDB, error  : "+err); 
        // If error, exit from application
        process.exit(1);
    })


