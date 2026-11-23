import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
        trim : true,
    },
    email :{
        type : String,
        trim : true,
        unique : true,
        require : true
    },
    password :{
        type : String,
        require : true
    }, 
    bio : {
        type : String,
        trim : true
    },
    city :{
        type : String
    },
     image :{
        type : String,
        default : "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
    },
},{timestamps : true})

const UserModel = mongoose.model("User",userSchema);      // Create model and model name is "user"

export default UserModel;



