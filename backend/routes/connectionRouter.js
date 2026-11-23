import express from "express"
import {sendConnection, acceptConnection, getAllConnectionRequest, getFriends, friendSuggestions, rejectConnection} from "../controllers/ConnectionController.js" 
import {auth} from "../middlewares/auth.js"


const connectionRouter = express.Router()

connectionRouter.post("/send", auth, sendConnection)
connectionRouter.get("/all-request", auth, getAllConnectionRequest)
connectionRouter.patch("/accept", auth, acceptConnection)
connectionRouter.get("/friends", auth,  getFriends )
connectionRouter.get("/friends-suggestion", auth, friendSuggestions)
connectionRouter.post("/reject", auth, rejectConnection)

export default connectionRouter;