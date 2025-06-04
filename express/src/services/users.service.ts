import { AppDataSource } from "../config/database";
import { Users } from "../entities/Users.entity";
import { DeleteResult, Repository } from "typeorm";
import { PlayerNotFoundError } from "../errors/users.errors";

export class UsersService {
    private usersRepository: Repository<Users>;

    constructor() {
        this.usersRepository = AppDataSource.getRepository(Users);
    }

    async findById(id: number): Promise<Users | null> {
        return await this.usersRepository.findOneBy({ id });
    }

    async getUserStatById(id: number): Promise<Users> {
        const user = await this.usersRepository.findOne({
            where: { id: id },
            select: {
                id: true,
                username: true,
                xp: true,
                level: true,
                wongame: true,
                lostgame: true,
                wonteamgame: true,
                lostteamgame: true,
            },
        });

        if (!user) throw new PlayerNotFoundError(id);

        return user;
    }

    // USER PROFILE
    async getUserByUsername(username: string): Promise<Users> {
        const user = await this.usersRepository.findOne({
            where: { username: username },
            select: {
                id: true,
                username: true,
                xp: true,
                level: true,
                wongame: true,
                lostgame: true,
                wonteamgame: true,
                lostteamgame: true,
            },
        });

        if (!user) throw new PlayerNotFoundError(0);

        return user;
    }

    // SEARCH BAR
    async searchUserByUsername(input: string): Promise<Users[]> {
        const search = await this.usersRepository
            .createQueryBuilder("users")
            .where("username LIKE :input", { input: `${input}%` })
            .select(["users.username", "users.id"])
            .take(5)
            .getMany();

        return search;
    }

    async deleteUser(id: number): Promise<DeleteResult> {
        const deleteTheUser = await this.usersRepository.delete({ id: id });

        return deleteTheUser;
    }
}
