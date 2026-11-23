import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    desc :{
        type : String
    },
    image : {
        type : String
    },
    likes : {
        type : [mongoose.Schema.Types.ObjectId],   // Bacause i like possible from one id
        default : [],
    }
}, {timeStamps : true})



const postModel = mongoose.model("Post", postSchema)
export default postModel