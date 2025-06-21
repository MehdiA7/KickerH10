import express from "express";

import { logger } from "../middleware/logger";
import { GameController } from "../controllers/game.controller";
import { authJwt } from "../middleware/authJwt";

const gameRouter = express.Router();
gameRouter.use(express.json());

gameRouter.get("/:userId", logger, authJwt, GameController.getSoloAndTeamMatch);

export default gameRouter;
