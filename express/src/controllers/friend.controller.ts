import { Request, Response } from "express";
import { FriendService } from "../services/friend.service";
import { FriendData } from "../lib/friendType";
import { PlayerNotFoundError } from "../errors/users.errors";
import { FriendRequestDoesntExist } from "../errors/friend.erros";

const friendService = new FriendService();

export class FriendController {

    //               CREATE NEW FRIEND REQUEST

    static async createFriend(req: Request, res: Response) {
        try {
            const theBody: FriendData = req.body;

            if (!theBody.user || !theBody.friend === undefined) {
                res.status(400).send({
                    success: false,
                    message: "All field is required",
                });
                return;
            }

            if (theBody.user === theBody.friend) {
                res.status(409).send({
                    success: false,
                    message: "You can invite yourself...",
                });
                return;
            }

            const createFriend = await friendService.createFriend(theBody);

            res.status(201).send({
                success: true,
                message: "Friend added !",
                conten: createFriend,
            });
            return;
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

    //               ACCEPTE A NEW FRIEND

    static async acceptFriend(req: Request, res: Response) {
        try {
            const theBody: FriendData = req.body;

            if (!theBody.user || !theBody.friend === undefined) {
                res.status(400).send({
                    success: false,
                    message: "All field is required",
                });
                return;
            }

            if (theBody.user === theBody.friend) {
                res.status(409).send({
                    success: false,
                    message: "You can invite yourself...",
                });
                return;
            }

            const acceptFriend = await friendService.acceptFriend(theBody);

            res.status(200).send({
                success: true,
                message: "Friend accepted !",
                content: acceptFriend,
            });
            return;
        } catch (error) {
            if (error instanceof FriendRequestDoesntExist) {
                res.status(404).send({
                    success: false,
                    message: error.message,
                });
                return;
            }

            res.status(500).send({
                success: false,
                message: `Unknow error handled... ${error}`,
            });
            return;
        }
    }

    //               GET FRIEND
    static async getFriendWithUserId(req: Request, res: Response) {
        try {
            
            const userId: number = parseInt(req.params.userId);
            const pageNumber = parseInt(req.params.page);
            const limitNumber = parseInt(req.params.limit);

            if (!userId) {
                res.status(400).send({
                    success: false,
                    message: "The format is not correct."
                });
                return;
            }

            const friend = await friendService.getFriend(userId, pageNumber, limitNumber);

            res.status(200).send({
                success: true,
                message: "Its works !",
                content: friend.content,
                currentPage: friend.currentPage,
                totalPage: friend.totalPage
            })
        } catch(error) {

            res.status(500).send({
                success: false,
                message: `Unknow error... : ${error}`
            });
            return;
        }
    }

    //               CHECK IF IS YOUR FRIEND
    static async checkIfIsFriend(req: Request, res: Response) {
        try {
            const userId: string = req.params.userId;
            const friendId: string = req.params.friendId;

            if (!userId || !friendId) {
                res.status(400).send({
                    success:false,
                    message: "Field is required"
                });
                return;
            }
            const parseUserId: number = parseInt(userId);
            const parseFriendId: number = parseInt(friendId);

            if (!Number.isInteger(userId) || !Number.isInteger(friendId)) {
                res.status(400).send({
                    success: false,
                    message: "Number id is required..."
                });
                return;
            }

            const response = await friendService.checkFriend(parseUserId, parseFriendId);

            res.status(200).send({
                success: true,
                message: "Are you friend ?",
                content: response
            });
            return;

        } catch (error) {
            res.status(500).send({
                success: false,
                message: `Unknow error ... : ${error}`
            });
            return;
        }
    }
}
