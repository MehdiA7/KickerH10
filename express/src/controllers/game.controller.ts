import { Request, Response } from "express";
import { GameService } from "../services/game.service";

const gameService = new GameService();

export class GameController {

    public static async getSoloAndTeamMatch(req: Request, res: Response) {
        
    }
}
