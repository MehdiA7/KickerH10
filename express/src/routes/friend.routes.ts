import express from "express";
import { logger } from "../middleware/logger";
import { FriendController } from "../controllers/friend.controller";

const friendRouter = express.Router();
friendRouter.use(express.json());

friendRouter.post("/friend", logger, FriendController.createFriend);

export default friendRouter;