import { Request, Response } from "express";
import { GameService } from "../services/game.service";

const gameService = new GameService();

export class GameController {

    public static async getSoloAndTeamMatch(req: Request, res: Response) {
        try {
            const userId: number = parseInt(req.params.userId);

            const reponse = await gameService.getRecentSoloAndTeamMatch(userId);

            res.status(200).send({
                success: true,
                message: "All matches",
                content: reponse
            });
            return;

        } catch (error) {
            
            res.status(500).send({
                success: false,
                message: `Unknow errror : ${error}`
            });
            return;
        }
    }
}
