import { Request, Response } from "express";
import { TeamGameData } from "../lib/teamGameType";
import { TeamGameService } from "../services/teamGame.service";

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
            res.status(500).send({
                success: false,
                message: `Unknow Error... : ${error}`
            })
        }
    }
}
