import { AppDataSource } from "../config/database";
import { Users } from "../entities/Users.entity";
import { DeleteResult, Repository } from "typeorm";

export class UsersService {
    private usersRepository: Repository<Users>;

    constructor() {
        this.usersRepository = AppDataSource.getRepository(Users);
    }

    async findById(id: number): Promise<Users | null> {
        return await this.usersRepository.findOneBy({ id });
    }

    async searchUserByUsername(input: string): Promise<Users[]> {

        const search = await this.usersRepository
            .createQueryBuilder("users")
            .where("username LIKE :input", { input: `${input}%` })
            .select(["users.username", "users.id"])
            .take(5)
            .getMany()

        return search;
    }

    async deleteUser(id: number): Promise<DeleteResult> {

        const deleteTheUser = await this.usersRepository.delete({id: id});

        return deleteTheUser;
    }
}
