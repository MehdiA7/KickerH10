import { TeamGame } from "../entities/TeamGame.entity";
import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";

export class TeamGameService {
    private teamGameRepository: Repository<TeamGame>;

    constructor() {
        this.teamGameRepository = AppDataSource.getRepository(TeamGame);
    }

    async createANewGame(gameData: string): Promise<TeamGame> {
        return await this.teamGameRepository.create({});
    }
}
