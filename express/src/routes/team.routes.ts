import express from "express";
import { logger } from "../middleware/logger";
import { TeamController } from "../controllers/team.controller";

const teamRouter = express.Router();
teamRouter.use(express.json());

teamRouter.post("/team", logger, TeamController.createTeam);

export default teamRouter;
