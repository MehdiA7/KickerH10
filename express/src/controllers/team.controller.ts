import { Request, Response } from "express";
import { TeamService } from "../services/team.service";
import { PlayerNotFoundError } from "../errors/users.errors";
import { TeamNameTakenError } from "../errors/team.errors";
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
                return;
            }

            const createTeam = await teamService.createTeam(theBody);

            res.status(201).send({
                success: true,
                message: "Team created !",
                content: createTeam,
            });
            return;
        } catch (error) {
            if (error instanceof PlayerNotFoundError){
                res.status(404).json({
                    success: false,
                    message: error.message,
                });
            }

            if (error instanceof TeamNameTakenError) {
                res.status(409).json({
                    success: false,
                    message: error.message,
                });
                return;
            }

            console.error("Unexpected error:", error);
            res.status(500).json({
                success: false,
                message: "Internal server error",
            });
            return
        }
    }

    static async getTeamByUserId(req: Request, res: Response) {
        try {
            const userId: string = req.params.userId;

            const id: number = parseInt(userId);

            if (!Number.isInteger(id) || id < 0) {
                res.status(400).send({
                    success: false,
                    message: "Id format is not good, need only positive number"
                });
                return;
            } 

            const response = await teamService.getTeamByUserId(id);
            
            res.status(200).send({
                success: true,
                message: "All team by userId",
                content: response
            });
            return;

        } catch (error) {

            if(error instanceof PlayerNotFoundError) {
                res.status(400).send({
                    success: false,
                    message: error.message
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
}
