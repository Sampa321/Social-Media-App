import Post from "../Models/Posts.js"
import User from "../Models/User.js"

export async function getAllPosts(req, res) {
    try {
        const {userId} = req.body;
        if(!userId)
        {
            return res.json({success : false, message : " UserId not found"})
        }
        const allPosts =  await Post.find({userId});
        return res.json({success : true, message : "Post fetched successfully", posts : allPosts})
    } catch (error) {
        return res.json({success : false, message : "Internal server error!! " + error})
    }
}


export async function getFeedPosts(req, res) {
    try {
        const posts = await Post.find({}).limit(10).populate("userId", "name email image bio city");
        return res.json({success : true, message : " feed post fetched successfully", Feedposts : posts})
    } catch (error) {
        return res.json({success : false, message : "Internal server error!! " + error})
    }
}


export async function uploadPost(req, res) {
    try {
        let {desc, image} = req.body;
        if(!desc && !image)
        {
            return res.json({success : false, message : "Upload unsuccessfull"})
        }
        if(!desc) desc = null;
        if(!image) image = null;
        const post = new Post({
            userId : req.user._id,
            desc, image
        })
        await post.save();
        return res.json({success : true, message : "Post upload successfully ", post})
    } catch (error) {
        return res.json({success : false, message : "Internal server error!! " + error})
    }
}
 

export async function deletePost(req, res) {
    try {
        const {postId} = req.body;
        const post = await Post.findById(postId);
        if(!post || (post && !post.userId.equals(req.user._id)))
        {
            return res.json({success : false, message : "Not possible"})
        }
        await Post.findByIdAndDelete(postId)
        return res.json({success : true, message : "Post deleted successfully!!"})
    } catch (error) {
        return res.json({success : false, message : "Internal server error!! " + error})
    }
}
 

export async function likePost(req, res) {
    try {
        const userId = req.user._id;
        const postId = req.body.postId;
        const post = await Post.findById(postId);
        if(!post)
        {
            return res.json({success : false, message : "can't find post"})
        }
        let arr = [];
        let found = false;
        for(let ele of post.likes)
        {
            if(ele.toString() == userId.toString())
            {
                found = true
                continue
            }
            arr.push(ele);
        }

        if(found)
        {
            post.likes = arr;
            await post.save();
        }
        else
        {
            post.likes.push(userId);
            await post.save();

        }
        return res.json({ success: true, message: found ? "unliked " : "liked" });
    } catch (error) {
        return res.json({
      success: false,
      message: "Internal Server Error : " + error,
    });
    }
}