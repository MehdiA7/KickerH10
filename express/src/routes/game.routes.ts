import express from "express";

import { logger } from "../middleware/logger";
import { GameController } from "../controllers/game.controller";

const gameRouter = express.Router();
gameRouter.use(express.json());

gameRouter.get("/:userId", logger, GameController.getSoloAndTeamMatch);

export default gameRouter;
