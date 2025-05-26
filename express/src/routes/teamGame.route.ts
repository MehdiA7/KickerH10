import express from "express";
import { logger } from "../middleware/logger";
import { TeamGameController } from "../controllers/teamGame.controller";

const teamGameRouter = express.Router();
teamGameRouter.use(express.json());

teamGameRouter.post("/", logger, );

export default teamGameRouter;
