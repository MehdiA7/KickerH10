import express from "express";
import { logger } from "../middleware/logger";
import { FriendController } from "../controllers/friend.controller";
import { authJwt } from "../middleware/authJwt";

const friendRouter = express.Router();
friendRouter.use(express.json());

friendRouter.post("/", logger, authJwt, FriendController.createFriend);
friendRouter.patch("/", logger, authJwt, FriendController.acceptFriend);
friendRouter.get("/id=:userId/page=:page/limit=:limit", logger, authJwt, FriendController.getFriendWithUserId);
friendRouter.get("/userId=:userId/friendId=:friendId", logger, authJwt, FriendController.checkIfIsFriend);

export default friendRouter;