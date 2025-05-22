import express from "express";
import { logger } from "../middleware/logger";
import { UsersController } from "../controllers/users.controller";

const usersRouter = express.Router();
usersRouter.use(express.json());

usersRouter.post("/user/search", logger, UsersController.SearchUsers);
usersRouter.delete("/user/:userId", logger, UsersController.DeleteUser);

export default usersRouter;
