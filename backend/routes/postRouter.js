import express from "express"
import { deletePost, getAllPosts, getFeedPosts, likePost, uploadPost } from "../controllers/postControllers.js"
import {auth} from "../middlewares/auth.js"


const postRouter = express.Router()

postRouter.get("/all-posts", getAllPosts)
postRouter.get("/posts", getFeedPosts)
postRouter.post("/upload", auth, uploadPost)
postRouter.delete("/delete", auth, deletePost)
postRouter.patch("/like", auth, likePost)

export default postRouter;