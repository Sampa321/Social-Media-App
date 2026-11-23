import validator from "validator"
import User from "../Models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendQuickMail } from "../utils/mail.js";

export async function signup(req, res) {
    try{
        let {name, email, password} = req.body;

         if(!name || !email || !password)
        {
            return res.status(401).json({success : false, message : "Name, Email and Password missing"})
        }

        name = name.trim();
        email = email.trim();
        password = password.trim();

        if(!name || !email || !password)
        {
            return res.status(401).json({success : false, message : "Name, Email and Password fields required"})
        }

        if(!validator.isEmail(email))
        {
            return res.status(401).json({success : false, message : "Enter correct email !"})
        }

        if(password.length  < 5)
        {
            return res.status(401).json({success : false, message : "Enter a Strong passwoed !!"})
        }


        // Convert original password to hash string that hacker can't able the actual password
        let hashPassword = await bcrypt.hash(password, 10)


        // Create user
        let user = new User({
            name,
            email,
            password :hashPassword,
        });


        // save user
        await user.save();
        const msg = "Welcome to Our Website , "+ name + " !! Enjoy !!"
       await sendQuickMail("Welcome to Social Media App" , email , msg )
        return res.json({success : true, message : "Signup successful!!✅"});
    }
    catch(error)
    {
       return res.status(500).json({success : false, message : "Internal server error "+ error.message})
    }
}


export async function login(req, res) {
    try{
        let {email, password} = req.body;

        if(!email || !password)
        {
            res.status(401).json({success : false, message : "Email and password missing!!"})
        }
        email = email.trim();
        password = password.trim();

        if(!email || !password)
        {
            res.status(401).json({success : false, message : "Email and password field required!!"})
        }

        if(!validator.isEmail(email))
        {
            res.status(401).json({success : false, message : "Enter correct email!!"})
        }

        if(password.length < 5)
        {
            res.status(401).json({success : false, message : "Enter strong password!!"})
        }


        // Find user which email this because email is unique
        let foundUser = await User.findOne({email})
        if(!foundUser)
        {
            return res.status(404).json({success : false, message : "User doesn't exists"})
        }


        // check two password same or not
        let isSamePassword = await bcrypt.compare(password, foundUser.password);;
        if(!isSamePassword)
        {
            return res.status(404).json({success: false, message : "Invalid Creadentails"})
        }

        // token create
        let secret = process.env.SECRET;
        const token = jwt.sign({id : foundUser._id}, secret)   
        res.cookie('token',token)   // token expire after 7 days
        return res.json({success : true, message : foundUser + " Login successful!!"})
    }
    catch(error){
        res.status(500).json({success : false, message : "Internal server error "+ error.message})
    }
}


export async function logout(req, res) {
    // clear cookie
    res.clearCookie('token');
   return res.json({success : true, message : "Logout successful!!"})
}