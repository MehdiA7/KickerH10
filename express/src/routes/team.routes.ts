import express from "express";
import { logger } from "../middleware/logger";
import { TeamController } from "../controllers/team.controller";
import { authJwt } from "../middleware/authJwt";

const teamRouter = express.Router();
teamRouter.use(express.json());

teamRouter.post("/", logger, authJwt, TeamController.createTeam);
teamRouter.get("/userId=:userId", logger, authJwt, TeamController.getTeamByUserId);

export default teamRouter;
