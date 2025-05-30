import { Repository } from "typeorm";
import { SoloGame } from "../entities/SoloGame.entity";
import { TeamGame } from "../entities/TeamGame.entity";
import { AppDataSource } from "../config/database";

export class GameService {
    private soloGameRepository: Repository<SoloGame>;
    private teamGameRepositiory: Repository<TeamGame>;
    
    constructor() {
        this.soloGameRepository = AppDataSource.getRepository(SoloGame);
        this.teamGameRepositiory = AppDataSource.getRepository(TeamGame);
    }

    
}