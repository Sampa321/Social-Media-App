import express from "express";
import { getProfile } from "../controllers/UserControllers.js";

const userRouter = express.Router();

userRouter.get("/profile", getProfile);

export default userRouter;
































//user
    // getUser 
    // update user
    // Friends


//product
  //get
  //update
  //buyers