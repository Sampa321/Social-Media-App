import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import user from "../Models/User.js"

dotenv.config();  // Access the environment variables

export  async function getProfile(req, res) {
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
        const userObj = await user.findById(obj.id).select('-password');

        if(!userObj)
        {
           return res.json({success : false, message : "Login for API use"})
        }
        return res.json({success : true, message : "Profile fetched!!", user : userObj})
    } catch (error) {
       return res.json({success : false, message : "Internal server error : "+ error});
    }
}