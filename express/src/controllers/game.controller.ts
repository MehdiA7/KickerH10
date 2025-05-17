import { Request, Response } from "express";
import { SoloGameService } from "../services/soloGame.service";
import { GameData } from "../lib/soloType";

const soloGameService = new SoloGameService();

export class GameController {
    static async createNewSoloMatch(req: Request, res: Response) {
        try {
            const theBody: GameData = req.body;

            if (
                !theBody.player1 ||
                !theBody.player2 ||
                !theBody.score1 ||
                !theBody.score2 === undefined
            ) {
                res.status(400).send({
                    success: false,
                    message: "All field is required",
                });
                return;
            }

            if (theBody.score1 !== 11 && theBody.score2 !== 11) {
                console.log(theBody.score1);
                console.log(theBody.score2);
                res.status(400).send({
                    success: false,
                    message: "No winner... Need 11 on one side",
                });
                return;
            }

            const createdGame = await soloGameService.createANewSoloGame(
                theBody
            );

            res.status(201).send({
                success: true,
                message: "Solo match created !",
                content: createdGame,
            });
            return;
        } catch (error) {
            res.status(404).send({
                success: false,
                message: error.message,
            });
            return;
        }
    }
}
