import { Request, Response } from "express";
import { UsersService } from "../services/users.service";
import { SearchUserBody } from "../lib/usersType";

const usersService = new UsersService();

export class UsersController {

    static async SearchUsers(req: Request, res: Response) {
        try {
            const theBody: SearchUserBody = req.body;

            const reponse = await usersService.searchUserByUsername(theBody.input);

            res.status(200).send({
                success: true,
                message: "Its works !",
                content: reponse
            })
            return;

        } catch(error) {

            res.status(500).send({
                success: false,
                message: `Unknow error... : ${error}`
            });
            return;
        }
    }
}
