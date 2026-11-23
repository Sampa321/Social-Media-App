import { set } from "mongoose";
import Connection from "../Models/Connection.js";
import User from "../Models/User.js";


export async function sendConnection(req, res) {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.body.toUserId;


        //User send request yourself
        if(fromUserId == toUserId)
        {
            return res.json({success : false, message : "Can't send request to yourself!"})
        }



        // to check is toUserId exist or not
        const destinationUser = await User.findById(toUserId);
        if(!destinationUser)
        {
            return res.json({success : false, message : "Target User doesn't exists!"});
        }


        // Already friend
        const existConnection = await Connection.findOne({
            $or : [
                {fromUserId : fromUserId, toUserId : toUserId},
                {fromUserId : toUserId, toUserId : fromUserId},
            ],
        });
        
        if(existConnection)
        {
            return res.json({success : false, message : "Connection request alreay exists"})
        }


        // create connection object
        const connectionObj = new Connection({
            fromUserId, toUserId, status : "pending"
        })


        // For databse save
        await connectionObj.save();
        return res.json({success : true, message : "Connection request sent!", obj : connectionObj})

    } catch (error) {
        return res.json({success : false, message : "Internal server error!! " + error})
    }
}



export async function acceptConnection(req,res)
{
    try { 
        const connectionId = req.body.connectionId;
        const connection = await Connection.findById(connectionId);


        //Check connection request correct or not
        if(!connection)
        {
            return res.json({success : false, message : "No Connection exists!!"})
        }


        // Check send you request or not
        if(connection.toUserId.equals(req.user._id))
        {
            res.json({success : false, message : "Something error in connection!"})
        }

        // Update connection
        const updatedConnection = await Connection.findByIdAndUpdate(connectionId, {
            status :  "accepted"
        }) 
        return res.json({success : true, message : "Connection Accepted!!", updatedConnection});
        
    } catch (error) {
        return res.json({success : false, message : "Internal server error!! " + error})
    }
}



export async function rejectConnection(req,res)
{
     try { 
        const connectionId = req.body.connectionId;
        const connection = await Connection.findById(connectionId);


        // Check send you request or not
        if(connection.toUserId.equals(req.user._id))
        {
            res.json({success : true, message : "Connection Rejected!"})
            return await Connection.findByIdAndDelete(connectionId);
        }
        return res.json({success : false, message : "Connection is not Rejected!!"});
    } catch (error) {
        return res.json({success : false, message : "Internal server error!! " + error})
    }
}



export async function getAllConnectionRequest(req,res)
{
    try {
        const connections = await Connection.find({
            toUserId : req.user._id,
            status : "pending"
        }).populate("fromUserId", "name email image bio city");

        return res.json({success : true, message : "All connection request fetched", requests : connections})
    } catch (error) {
        return res.json({success : false, message : "Internal server error!!"})
    }
}



export async function getFriends(req, res) {
    try {
        
        const connections  = await Connection.find({
            $or : [
             {   fromUserId : req.user._id } ,
             { toUserId: req.user._id}
            ],
            status : "accepted"
        }).populate("fromUserId" , "name email bio city").populate("toUserId" , "name email bio city")
        return res.json({success : true , message : "All friends fetched ", friends : connections })
    } catch (error) {
         return res.json({ success: false, message: "Internal Server Error" });
    }
}





export async function friendSuggestions(req, res) {
    try {
        const connections = await Connection.find({
            $or : [
                {fromUserId : req.user._id},
                {toUserId : req.user._id}
            ]
        })
        const set = new Set();

        // add connection user in set
        for(let conn of connections)
        {
            set.add(conn.fromUserId)
            set.add(conn.toUserId)
        }
        const suggestions = await User.find({    // find suggestions user
            _id : {$nin : [...set]}    // Suggestions also show who is not in set
        }).select("-password").limit(10)    // I can't show password and i want to show first 10 people 
        return res.json({success : true, message : "Suggestions fetched successfully!!", suggestions})

    } catch (error) {
        return res.json({success : false, message : "Internal server error"+ error.message})
    }
}