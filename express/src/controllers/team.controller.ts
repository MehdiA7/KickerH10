import { Request, Response } from "express";
import { TeamService } from "../services/team.service";
import { TeamData } from "../lib/teamType";

const teamService = new TeamService();

export class TeamController {
    static async createTeam(req: Request, res: Response) {
        try {
            const theBody: TeamData = req.body;

            if (
                !theBody.name ||
                !theBody.player1 ||
                !theBody.player2 === undefined
            ) {
                res.status(400).send({
                    success: false,
                    message: "All field is required",
                });
                return;
            }

            if (theBody.name === "") {
                res.status(400).send({
                    success: false,
                    message: "Name is empty",
                });
            }

            const createTeam = await teamService.createTeam(theBody);

            res.status(201).send({
                success: true,
                message: "Team created !",
                content: createTeam,
            });
        } catch (error) {
            res.status(404).send({
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "An unknow error occurred",
            });
        }
    }
}
