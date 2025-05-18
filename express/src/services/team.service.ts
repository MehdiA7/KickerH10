import { AppDataSource } from "../config/database";
import { Repository, Table } from "typeorm";
import { Team } from "../entities/Team.entity";
import { Users } from "../entities/Users.entity";
import { TeamData } from "../lib/teamType";

export class TeamService {
    private teamRepository: Repository<Team>;
    private usersRepository: Repository<Users>;

    constructor() {
        this.teamRepository = AppDataSource.getRepository(Team);
        this.usersRepository = AppDataSource.getRepository(Users);
    }

    async createTeam(teamData: TeamData): Promise<Team> {
        
        // Check if the payload is good
        if (teamData.name === null || teamData.name === "")
            throw new Error("Name is empty...");

        // check user id is correct
        const player1 = await this.usersRepository.findOne({
            where: { id: teamData.player1 },
            select: ["id", "username"]
        });
        if (!player1) throw new Error("player 1 not found");

        const player2 = await this.usersRepository.findOne({
            where: { id: teamData.player2 },
            select: ["id", "username"]
        });
        if (!player2) throw new Error("player 2 not found");

        // Create the team
        const newTeam = this.teamRepository.create({
            name: teamData.name,
            player1: [player1],
            player2: [player2]
        })

        return await this.teamRepository.save(newTeam);

    }
}