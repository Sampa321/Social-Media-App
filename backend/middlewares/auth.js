import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import User from "../Models/User.js";

dotenv.config();

export async function auth(req, res, next) {
    try {
        // Access cookie
        // const cookie = req.cookies;
        // console.log("cookie : " +cookie);


        // Access token
        const token = req.cookies.token;
        //console.log(token);

        if(!token)
        {
            return res.json({success : false, message : "Login for API use"})
        }


        //Access secret from .env file
        const secret = process.env.SECRET;


        // Find id for generate obj 
        const obj = jwt.verify(token, secret);
        //console.log("Id : "+obj.id);
        

        //find obj and not show password in mongoDB DB.
        const userObj = await User.findById(obj.id).select('-passwoed');

        if(!userObj)
        {
           return res.json({success : false, message : "Login for API use"})
        } 
        req.user = userObj;
        next();
    } catch (error) {
       return res.json({success : false, message : "Internal server error : "+ error});
    }
}
