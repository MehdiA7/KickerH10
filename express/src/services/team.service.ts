import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";
import { Team } from "../entities/Team.entity";
import { Users } from "../entities/Users.entity";
import { TeamData } from "../lib/teamType";

export class PlayerNotFoundError extends Error {
    constructor(playerId: number) {
        super(`Player with ID ${playerId} not found`);
        this.name = "PlayerNotFoundError";
    }
}

export class TeamNameTakenError extends Error {
    constructor(teamName: string) {
        super(`Team name ${teamName} is already taken`);
        this.name = "TeamNameTakenError";
    }
}

export class TeamService {
    private teamRepository: Repository<Team>;
    private usersRepository: Repository<Users>;

    constructor() {
        this.teamRepository = AppDataSource.getRepository(Team);
        this.usersRepository = AppDataSource.getRepository(Users);
    }

    async createTeam(teamData: TeamData): Promise<Team> {
        // check user id is correct
        const player1 = await this.usersRepository.findOne({
            where: { id: teamData.player1 },
            select: ["id", "username"],
        });
        if (!player1) throw new PlayerNotFoundError(teamData.player1);

        const player2 = await this.usersRepository.findOne({
            where: { id: teamData.player2 },
            select: ["id", "username"],
        });
        if (!player2) throw new PlayerNotFoundError(teamData.player2);

        // Check team name
        const teamExist = await this.teamRepository.exists({
            where: { name: teamData.name },
        });
        if (teamExist) throw new TeamNameTakenError(teamData.name);

        // Create the team
        const newTeam = this.teamRepository.create({
            name: teamData.name,
            player1: player1,
            player2: player2,
        });

        return await this.teamRepository.save(newTeam);
    }
}
