import express from "express";
import { logger } from "../middleware/logger";
import { UsersController } from "../controllers/users.controller";
import { authJwt } from "../middleware/authJwt";

const usersRouter = express.Router();
usersRouter.use(express.json());

usersRouter.get("/id=:userId", logger, authJwt, UsersController.GetUserStat);
usersRouter.get("/username=:username", logger, authJwt, UsersController.GetUserByUsername);
usersRouter.post("/search", logger, authJwt, UsersController.SearchUsers);
usersRouter.delete("/id=:userId", logger, authJwt, UsersController.DeleteUser);

export default usersRouter;
