import { Request, Response } from "express";
import { SoloGameService } from "../services/soloGame.service";
import { GameData } from "../lib/soloType";

const soloGameService = new SoloGameService();

export class GameController {
    static async register(req: Request, res: Response) {
        try {
            const theBody: GameData = req.body;
        } catch (error) {
            
        }
    }
}
