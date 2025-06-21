import express from "express";
import { logger } from "../middleware/logger";
import { SoloGameController } from "../controllers/soloGame.controller";
import { authJwt } from "../middleware/authJwt";

const soloGameRouter = express.Router();
soloGameRouter.use(express.json());

soloGameRouter.post("/", logger, authJwt, SoloGameController.createNewSoloMatch);
soloGameRouter.get("/page=:page/limit=:limit", logger, authJwt, SoloGameController.getSoloGame);
soloGameRouter.get("/userId=:userId/page=:page/limit=:limit", logger, authJwt, SoloGameController.getSoloGameWithUserId);

export default soloGameRouter;
