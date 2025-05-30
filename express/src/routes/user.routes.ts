import express from "express";
import { logger } from "../middleware/logger";
import { UsersController } from "../controllers/users.controller";

const usersRouter = express.Router();
usersRouter.use(express.json());

usersRouter.get("/:userId", logger, UsersController.GetUserStat);
usersRouter.post("/search", logger, UsersController.SearchUsers);
usersRouter.delete("/:userId", logger, UsersController.DeleteUser);

export default usersRouter;
