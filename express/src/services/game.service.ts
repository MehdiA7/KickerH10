import { Repository } from "typeorm";
import { SoloGame } from "../entities/SoloGame.entity";
import { TeamGame } from "../entities/TeamGame.entity";
import { AppDataSource } from "../config/database";
import { Users } from "../entities/Users.entity";

export class GameService {
    private userRepository: Repository<Users>;
    private soloGameRepository: Repository<SoloGame>;
    private teamGameRepositiory: Repository<TeamGame>;
    
    constructor() {
        
        this.userRepository = AppDataSource.getRepository(Users);
        this.soloGameRepository = AppDataSource.getRepository(SoloGame);
        this.teamGameRepositiory = AppDataSource.getRepository(TeamGame);
    }

    async getRecentSoloAndTeamMatch(userId: number): Promise<any> {
        const response = await this.userRepository.findOne({
            where: {id: userId},
            relations: ["playerid1"]
        })

        return response
    }
}