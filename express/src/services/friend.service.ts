import { Repository } from "typeorm";
import { Friend } from "../entities/Friend.entity";
import { Users } from "../entities/Users.entity";
import { AppDataSource } from "../config/database";
import { FriendData } from "../lib/friendType";
import { PlayerNotFoundError } from "../errors/users.errors";

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
            select: [ "id", "username" ]
        });
        if (!player2) throw new PlayerNotFoundError(friendData.friend);

        const createFriend = this.friendRepository.create({
            user: player1,
            friend: player2
        })

        return await this.friendRepository.save(createFriend);
    }

    async acceptFriend(friendData: )
}
