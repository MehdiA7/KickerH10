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

    // Maybe this request is optional.
    async getRecentSoloAndTeamMatch(userId: number): Promise<any> {
        const response = await this.userRepository.findOne({
            where: { id: userId },
            relations: [
                "playerid1",
                "playerid2",
                "teamplayerid1",
                "teamplayerid2",
            ],
            select: {
                id: true,
                username: true,
                xp: true,
                level: true,
                goal: true,
                wongame: true,
                lostgame: true,
                wonteamgame: true,
                lostteamgame: true,
                playerid1: true,
                playerid2: true,
                teamplayerid1: true,
                teamplayerid2: true,
            },
        });

        if (!response) {
            throw new Error();
        }

        const allRecentGame = [
            ...response.playerid1,
            ...response.playerid2,
            ...response.teamplayerid1,
            ...response.teamplayerid2,
        ];

        const formatResponse = {
            recentGame: allRecentGame,
        };

        return formatResponse;
    }
}
