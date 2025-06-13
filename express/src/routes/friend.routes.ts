import express from "express";
import { logger } from "../middleware/logger";
import { FriendController } from "../controllers/friend.controller";

const friendRouter = express.Router();
friendRouter.use(express.json());

friendRouter.post("/", logger, FriendController.createFriend);
friendRouter.patch("/", logger, FriendController.acceptFriend);
friendRouter.get("/id=:userId/page=:page/limit=:limit", logger, FriendController.getFriendWithUserId);
friendRouter.get("/userId=:userId/friendId=:friendId", logger, FriendController.checkIfIsFriend);

export default friendRouter;