import express from "express";
import { logger } from "../middleware/logger";
import { SoloGameController } from "../controllers/soloGame.controller";

const gameRouter = express.Router();
gameRouter.use(express.json());

gameRouter.post("/solo", logger, SoloGameController.createNewSoloMatch);

export default gameRouter;
