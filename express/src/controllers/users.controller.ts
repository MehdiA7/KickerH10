import { Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { SearchUserBody } from "../lib/usersType";
import { DeleteResult } from "typeorm";
import { PlayerNotFoundError } from "../errors/users.errors";

const usersService = new UsersService();

export class UsersController {

    // SEARCH BAR
    static async SearchUsers(req: Request, res: Response) {
        try {
            const theBody: SearchUserBody = req.body;

            if (theBody === null) {
                res.status(400).send({
                    success: false,
                    message: "Need input field",
                });
                return;
            }

            if (theBody.input === "") {
                res.status(400).send({
                    success: false,
                    message: "Input is empty...",
                    content: [],
                });
                return;
            }

            const reponse = await usersService.searchUserByUsername(
                theBody.input
            );

            res.status(200).send({
                success: true,
                message: `User list with ${theBody.input}`,
                content: reponse,
            });
            return;
        } catch (error) {
            res.status(500).send({
                success: false,
                message: `Unknow error... : ${error}`,
            });
            return;
        }
    }

    // USER PROFILE
    static async GetUserByUsername(req:Request, res: Response) {
        try {
            const username: string = req.params.username;

            if (!username) {
                res.status(400).send({
                    success: false,
                    message: "no content in your query..."
                });
                return;
            }

            const response = await usersService.getUserByUsername(username);

            res.status(200).send({
                success: true,
                message: "Your user by username",
                content: response
            });
            return;

        } catch (error) {
            if (error instanceof PlayerNotFoundError) {
                res.status(404).send({
                    success: false,
                    message: error.message
                });
                return;
            }

            res.status(500).send({
                success: false,
                message: `Unknow error... : ${error}`
            });
            return;
        }
    }

    static async GetUserStat(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId);

            if (!userId) {
                res.status(400).send({
                    success: false,
                    message: "Id is needed."
                });
                return;
            }

            const response = await usersService.getUserStatById(userId);

            res.status(200).send({
                success: true,
                message: "The user",
                content: response
            })
            
        } catch (error) {
            if (error instanceof PlayerNotFoundError) {
                res.send(404).send({
                    success: false,
                    message: "The player doesn't exist"
                });
                return;
            }

            res.status(500).send({
                success: false,
                message: `Unknow error handled... : ${error}`
            });
            return;
        }
    }

    static async DeleteUser(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.userId);

            if (userId === null) {
                res.status(400).send({
                    success: false,
                    message: "Id format is incorrect",
                });
                return;
            }

            const response: DeleteResult = await usersService.deleteUser(userId);

            if (!response.affected) {
                res.status(400).send({
                    success: false,
                    message: "Id is incorrect"
                });
                return;
            }

            res.status(200).send({
                success: true,
                message: "Delete success !",
            });
            return;
        } catch (error) {
            res.status(500).send({
                success: false,
                message: `Unknow error... : ${error}`,
            });
            return;
        }
    }
}
