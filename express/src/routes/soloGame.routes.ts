import express from "express";
import { logger } from "../middleware/logger";
import { SoloGameController } from "../controllers/soloGame.controller";

const soloGameRouter = express.Router();
soloGameRouter.use(express.json());

soloGameRouter.post("/", logger, SoloGameController.createNewSoloMatch);
soloGameRouter.get("/page=:page/limit=:limit", logger, SoloGameController.getSoloGame);
soloGameRouter.get("/userId=:userId/page=:page/limit=:limit", logger, SoloGameController.getSoloGameWithUserId);

export default soloGameRouter;
