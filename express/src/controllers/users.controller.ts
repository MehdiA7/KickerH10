import { Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { SearchUserBody } from "../lib/usersType";

const usersService = new UsersService();

export class UsersController {
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
                    content: []
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
}
