import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";
import { Team } from "../entities/Team.entity";
import { Users } from "../entities/Users.entity";
import { TeamData } from "../lib/teamType";
import { PlayerNotFoundError } from "../errors/users.errors";
import { TeamNameTakenError } from "../errors/team.errors";

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

    async getTeamByUserId(userId: number): Promise<Team[]> {

        const team = await this.teamRepository.find({
            relations: ["player1", "player2"],
            where: [{player1: {id: userId}}, {player2: {id: userId}}],
        });

        return team;
    }
}
