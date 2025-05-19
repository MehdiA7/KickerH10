import { Request, Response } from "express";
import { FriendService } from "../services/friend.service";
import { FriendData } from "../lib/friendType";
import { PlayerNotFoundError } from "../errors/users.errors";
import { FriendRequestDoesntExist } from "../errors/friend.erros";

const friendService = new FriendService();

export class FriendController {
    static async createFriend(req: Request, res: Response) {
        try {
            const theBody: FriendData = req.body;

            if (!theBody.user || !theBody.friend === undefined) {
                res.status(400).send({
                    success: false,
                    message: "All field is required",
                });
            }

            const createFriend = await friendService.createFriend(theBody);

            res.status(201).send({
                success: true,
                message: "Friend added !",
                conten: createFriend,
            });
        } catch (error) {
            if (error instanceof PlayerNotFoundError) {
                res.status(400).send({
                    success: false,
                    message: error.message,
                });
                return;
            }

            res.status(500).send({
                succes: false,
                message: "Unknow error handled...",
            });
            return;
        }
    }

    static async acceptFriend(req: Request, res: Response) {
        try {
            const theBody: FriendData = req.body;

            if (
                !theBody.user ||
                !theBody.friend ||
                theBody.accepted === undefined
            ) {
                res.status(400).send({
                    success: false,
                    message: "All field is required",
                });
            }

            const acceptFriend = friendService.acceptFriend(theBody);

            res.status(200).send({
                success: true,
                message: "Friend accepted !",
                content: acceptFriend
            })
        } catch (error) {
            if (error instanceof FriendRequestDoesntExist) {
                res.status(404).send({
                    success: false,
                    message: error.message
                });
            }

            res.status(500).send({
                success: true,
                message: "Unknow error handled..."
            })
            return;
        }
    }
}
