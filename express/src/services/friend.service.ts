import { Repository } from "typeorm";
import { Friend } from "../entities/Friend.entity";
import { Users } from "../entities/Users.entity";
import { AppDataSource } from "../config/database";
import { FriendData } from "../lib/friendType";
import { PlayerNotFoundError } from "../errors/users.errors";
import { FriendRequestDoesntExist } from "../errors/friend.erros";

export class FriendService {
    private friendRepository: Repository<Friend>;
    private usersRepository: Repository<Users>;

    constructor() {
        this.friendRepository = AppDataSource.getRepository(Friend);
        this.usersRepository = AppDataSource.getRepository(Users);
    }

    async createFriend(friendData: FriendData): Promise<Friend> {
        const player1 = await this.usersRepository.findOne({
            where: { id: friendData.user },
            select: ["id", "username"],
        });
        if (!player1) throw new PlayerNotFoundError(friendData.user);

        const player2 = await this.usersRepository.findOne({
            where: { id: friendData.friend },
            select: ["id", "username"],
        });
        if (!player2) throw new PlayerNotFoundError(friendData.friend);

        const createFriend = this.friendRepository.create({
            user: player1,
            friend: player2,
        });

        return await this.friendRepository.save(createFriend);
    }

    async acceptFriend(friendData: FriendData): Promise<Friend> {
        const friendRequestExist = await this.friendRepository.findOne({
            where: {
                user: { id: friendData.user },
                friend: { id: friendData.friend },
                accepted: false,
            },
        });

        if (friendRequestExist === null) throw new FriendRequestDoesntExist();

        await this.friendRepository.update(
            { id: friendRequestExist.id },
            { accepted: true }
        );

        friendRequestExist.accepted = true;

        return friendRequestExist;
    }

    // I need to get all friend but un the table we have 2 column with id
    async getFriend(userId: number): Promise<Friend[]> {
        
        const friend = await this.friendRepository.find({
            relations: ["user", "friend"],
            where: [{ user: { id: userId } }, { friend: { id: userId } }],
            select: {
                id: true,
                accepted: true,
                friend: {
                    id: true,
                    username: true,
                    xp: true,
                    level: true,
                    wongame: true,
                    lostgame: true,
                    wonteamgame: true,
                    lostteamgame: true
                },
                user: {
                    id: true,
                    username: true,
                    xp: true,
                    level: true,
                    wongame: true,
                    lostgame: true,
                    wonteamgame: true,
                    lostteamgame: true
                }
            }
        });

        return friend;
    }
}
