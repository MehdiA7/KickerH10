import { Request, Response } from "express";
import { SoloGameService } from "../services/soloGame.service";
import { GameData } from "../lib/soloGameType";
import { PlayerNotFoundError } from "../errors/users.errors";

const soloGameService = new SoloGameService();

export class SoloGameController {

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

            const createGame = await soloGameService.createANewSoloGame(
                theBody
            );

            res.status(201).send({
                success: true,
                message: "Solo match created !",
                content: createGame,
            });
            return;
        } catch (error) {
            if (error instanceof PlayerNotFoundError) {
                res.status(404).send({
                    success: false,
                    message: error.message,
                });
                return;
            }

            res.status(500).send({
                success: false,
                message: `Unknow error : ${error}`
            });
            return;
        }
    }

    static async getSoloGame(req: Request, res: Response) {
        try {
            const pageNumber: number = parseInt(req.params.page);
            const limitNumber: number = parseInt(req.params.limit);
            console.log(pageNumber, limitNumber);
            if (!pageNumber || !limitNumber) {
                res.status(400).send({
                    success: false,
                    message: "Page number is required"
                });
                return;
            }
            const response = await soloGameService.getSoloGame(pageNumber, limitNumber);

            res.status(200).send({
                success: true,
                message: "All solo game",
                content: response.content,
                currentPage: pageNumber,
                totalPage: response.totalPage
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: `Unknow error : ${error}`
            });
        }
    }

    static async getSoloGameWithUserId(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId);
            const pageNumber = parseInt(req.params.page);
            const limitNumber = parseInt(req.params.limit);

            if (!userId || !pageNumber || !limitNumber) {
                res.status(400).send({
                    success: false,
                    message: "Your request is not complete"
                });
                return;
            }

            const response = await soloGameService.getSoloGameWithUser(userId, pageNumber, limitNumber);

            res.status(200).send({
                success: true,
                message: "All match for this user",
                content: response.content,
                currentPage: response.currentPage,
                totalPage: response.totalPage
            })
            return;
        } catch (error) {
            res.status(500).send({
                success: false,
                message: `Unknow error : ${error}`
            })
        }
    }
}
