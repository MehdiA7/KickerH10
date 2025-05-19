import { Request, Response } from "express";
import { LoginBody, RegisterBody } from "../lib/connectionType";
import { UsersService } from "../services/users.service";
import { EmailIsTaken, EmailPasswordIsIncorrect } from "../errors/users.errors";
const jwt = require("jsonwebtoken");

const usersService = new UsersService();

// documentation about the password verification and hash
// https://www.freecodecamp.org/news/how-to-hash-passwords-with-bcrypt-in-nodejs/

export class AuthController {
    static async register(req: Request, res: Response) {
        try {
            let theBody: RegisterBody = req.body;

            if (
                !theBody.username ||
                !theBody.email ||
                !theBody.password ||
                !theBody.country === undefined
            ) {
                res.status(400).send({
                    success: false,
                    message: "All field is required",
                });
                return;
            }

            if (theBody.username.length < 3) {
                res.status(400).send({
                    success: false,
                    message: "Username is incorrect, 3char min",
                });
                return;
            }

            if (theBody.country.length < 3) {
                res.status(400).send({
                    success: false,
                    message: "Country is not valid",
                });
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(theBody.email)) {
                res.status(400).send({
                    success: false,
                    message: "Email format is invalid",
                });
                return;
            }

            if (theBody.password.length < 8) {
                res.status(400).send({
                    success: false,
                    message: "Password is incorrect, 8char min",
                });
                return;
            }

            await usersService.create(theBody);

            res.status(201).send({
                success: true,
                message: `The user ${theBody.username} are created !`,
            });
            return;
        } catch (error) {
            if (error instanceof EmailIsTaken) {
                res.status(409).send({
                    success: false,
                    message: error.message
                });
                return;
            }

            res.status(500).send({
                success: false,
                message: `Unknow error is handle : ${error}`,
            });
            return;
        }
    }

    static async login(req: Request, res: Response) {
        try {
            let theBody: LoginBody = req.body;

            if (!theBody.email || !theBody.password) {
                res.status(400).send({
                    success: false,
                    message: "Email and password field is required",
                });
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(theBody.email)) {
                res.status(400).send({
                    success: false,
                    message: "Email format is invalid",
                });
                return;
            }

            if (theBody.password.length < 8) {
                res.status(401).send({
                    success: false,
                    message: "Password is incorrect, 8char min",
                });
                return;
            }

            const dbResponse = await usersService.login(theBody);

            res.send({
                success: true,
                message: "You are logged !",
                content: dbResponse.content,
                token: dbResponse.token,
            });
        } catch (error) {
            if ( error instanceof EmailPasswordIsIncorrect) {
                res.status(401).send({
                    success: false,
                    message: error.message
                });
                return;
            }

            res.status(500).send({
                success: false,
                message: `Unknow error handle : ${error}`,
            });
            return;
        }
    }
}
export default AuthController;
