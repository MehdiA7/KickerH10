import express from "express";
import { logger } from "../middleware/logger";
import { TeamGameController } from "../controllers/teamGame.controller";
import { authJwt } from "../middleware/authJwt";

const teamGameRouter = express.Router();
teamGameRouter.use(express.json());

teamGameRouter.post("/", logger, authJwt, TeamGameController.createTeamMatch);
teamGameRouter.get("/page=:page/limit=:limit", logger, authJwt, TeamGameController.getTeamMatch);

export default teamGameRouter;
