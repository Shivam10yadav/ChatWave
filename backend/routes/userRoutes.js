import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js'
import { acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendReqs, getRecomendedUsers, sendFriendRequest } from '../controllers/user.controller.js'
const router=express.Router()

router.use(protectRoute)//apply auth to all routes

router.get('/',getRecomendedUsers)
router.get('/friends',getMyFriends)
router.post("/friend-request/:id",sendFriendRequest)
router.put("/friend-request/:id/accept",acceptFriendRequest)

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);


export default router