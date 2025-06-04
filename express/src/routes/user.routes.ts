import express from "express";
import { logger } from "../middleware/logger";
import { UsersController } from "../controllers/users.controller";

const usersRouter = express.Router();
usersRouter.use(express.json());

usersRouter.get("/id=:userId", logger, UsersController.GetUserStat);
usersRouter.get("/username=:username", logger, UsersController.GetUserByUsername);
usersRouter.post("/search", logger, UsersController.SearchUsers);
usersRouter.delete("/id=:userId", logger, UsersController.DeleteUser);

export default usersRouter;
