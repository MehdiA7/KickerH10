import express from "express";
import { logger } from "../middleware/logger";
import { FriendController } from "../controllers/friend.controller";

const friendRouter = express.Router();
friendRouter.use(express.json());

friendRouter.post("/", logger, FriendController.createFriend);
friendRouter.patch("/", logger, FriendController.acceptFriend);
friendRouter.get("/:userId", logger, FriendController.getFriendWithUserId);

export default friendRouter;