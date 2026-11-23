import mongoose from "mongoose"
import dotenv from "dotenv";
dotenv.config();


// this function will connect the app/server to db
export async function ConnectDB() {
    
    await mongoose.connect(process.env.DB_URL)  
}





// dotenv -> protect environment variable from leaking.
// js -> Mongoose  -> MongoDB
// Mongoose connect with database and env.DB_url.
// dotenv.config()  -> Access environment variables