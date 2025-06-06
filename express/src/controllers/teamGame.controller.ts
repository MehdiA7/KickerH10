import { Request, Response } from "express";
import { TeamGameData } from "../lib/teamGameType";
import { TeamGameService } from "../services/teamGame.service";
import { TeamNotFoundError } from "../errors/team.errors";

const teamGameService = new TeamGameService();

export class TeamGameController {
    
    static async createTeamMatch(req: Request, res: Response) {
        try {
            const theBody: TeamGameData = req.body;

            console.log(theBody)

            if (!theBody.score1 ||
                !theBody.score2 ||
                !theBody.teamId1 ||
                !theBody.teamId2 === undefined
            ) {
                res.status(400).send({
                    success: false,
                    message: "The body is invalid"
                });
                return;
            }

            if (theBody.score1 !== 11 && theBody.score2 !== 11) {
                res.status(400).send({
                    success: false,
                    message: "No winner..."
                });
                return;
            }

            const response = await teamGameService.createANewGame(theBody);

            res.status(201).send({
                success: true,
                message: "Team game are created !",
                content: response
            });
            return;

        } catch (error) {
            if (error instanceof TeamNotFoundError) {
                res.status(409).send({
                    success: false,
                    message: error.message
                });
                return;
            }

            res.status(500).send({
                success: false,
                message: `Unknow Error... : ${error}`
            })
        }
    }

    static async getTeamMatch(req: Request, res: Response) {
        try {
            const pageNumber: number = parseInt(req.params.page);
            const limitNumber: number = parseInt(req.params.limit);
            if (!pageNumber || !limitNumber) {
                res.status(400).send({
                    success: false,
                    message: "Page number is required"
                });
                return;
            }

            const response = await teamGameService.getTeamGame(pageNumber, limitNumber);

            res.status(200).send({
                success: true,
                message: "All team Game",
                content: response.content,
                currentPage: response.currentPage,
                totalPage: response.totalPage
            });
            return;
        } catch (error) {
            res.status(500).send({
                success: false,
                message: `Unknow error... : ${error}`
            });
            return;
        }
    }
}
