import { TeamGame } from "../entities/TeamGame.entity";
import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";
import { TeamGameData } from "../lib/teamGameType";
import { Team } from "../entities/Team.entity";
import { TeamNotFoundError } from "../errors/team.errors";
import { PagingGameFormat } from "../lib/gameType";
import { Users } from "../entities/Users.entity";
import { PlayerNotFoundError } from "../errors/users.errors";

export class TeamGameService {
    private teamGameRepository: Repository<TeamGame>;
    private teamRepository: Repository<Team>;
    private userRepository: Repository<Users>;

    constructor() {
        this.teamGameRepository = AppDataSource.getRepository(TeamGame);
        this.teamRepository = AppDataSource.getRepository(Team);
        this.userRepository = AppDataSource.getRepository(Users);
    }

    async createANewGame(gameData: TeamGameData): Promise<TeamGame> {
        let team1 = await this.teamRepository.findOne({
            where: { id: gameData.teamId1 },
            relations: ["player1", "player2"],
            select: {
                id: true,
                name: true,
                goal: true,
                player1: {
                    id: true,
                    username: true,
                    xp: true,
                    level: true,
                    goal: true,
                    wongame: true,
                    lostgame: true,
                },
                player2: {
                    id: true,
                    username: true,
                    xp: true,
                    level: true,
                    goal: true,
                    wongame: true,
                    lostgame: true,
                },
            },
        });
        if (!team1) throw new TeamNotFoundError(gameData.teamId1);
        if (!team1.player1) throw new PlayerNotFoundError(team1.player1);
        if (!team1.player2) throw new PlayerNotFoundError(team1.player2);

        let team2 = await this.teamRepository.findOne({
            where: { id: gameData.teamId2 },
            relations: ["player1", "player2"],
            select: {
                id: true,
                name: true,
                goal: true,
                player1: {
                    id: true,
                    username: true,
                    xp: true,
                    level: true,
                    goal: true,
                    wongame: true,
                    lostgame: true,
                },
                player2: {
                    id: true,
                    username: true,
                    xp: true,
                    level: true,
                    goal: true,
                    wongame: true,
                    lostgame: true,
                },
            },
        });

        if (!team2) throw new TeamNotFoundError(gameData.teamId2);
        if (!team2.player1) throw new PlayerNotFoundError(team2.player1);
        if (!team2.player2) throw new PlayerNotFoundError(team2.player2);

        let winner: number;
        if (gameData.score1 === 11) {
            winner = gameData.teamId1;
        } else {
            winner = gameData.teamId2;
        }
        
        // Update the user and team stat
        team1.goal += gameData.score1;
        team2.goal += gameData.score2;

        team1.player1.goal += gameData.score1;
        team1.player2.goal += gameData.score1;
        team2.player1.goal += gameData.score1;
        team2.player2.goal += gameData.score2;

        if (winner === team1.id) {
            team1.wongame += 1;

            team1.player1.wonteamgame += 1;
            team1.player2.wonteamgame += 1;

            team1.player1.xp += 10;
            if (team1.player1.xp > 100) {
                team1.player1.level += 1;
            }

            team1.player2.xp += 10;
            if (team1.player2.xp > 100) {
                team1.player2.level += 1;
            }

            team2.lostgame += 1;

            team2.player1.lostteamgame += 1;
            team2.player2.lostteamgame += 1;

            team2.player1.xp += 5;
            if (team2.player1.xp > 100) {
                team2.player1.level += 1;
            }

            team2.player2.xp += 5;
            if (team2.player2.xp > 100) {
                team2.player2.level += 1;
            }
        } else {
            team2.wongame += 1;

            team2.player1.wonteamgame += 1;
            team2.player2.wonteamgame += 1;

            team2.player1.xp += 10;
            if (team2.player1.xp > 100) {
                team2.player1.level += 1;
            }

            team2.player2.xp += 10;
            if (team2.player2.xp > 100) {
                team2.player2.level += 1;
            }

            team1.lostgame += 1;

            team1.player1.lostteamgame += 1;
            team1.player2.lostteamgame += 1;

            team1.player1.xp += 5;
            if (team1.player1.xp > 100) {
                team1.player1.level += 1;
            }

            team1.player2.xp += 5;
            if (team1.player2.xp > 100) {
                team1.player2.level += 1;
            }
        }

        const createGame = this.teamGameRepository.create({
            team1: team1,
            team2: team2,
            score1: gameData.score1,
            score2: gameData.score2,
            winner: winner,
        });

        return await this.teamGameRepository.save(createGame);
    }

    async getTeamGame(page: number): Promise<PagingGameFormat<TeamGame[]>> {
        const limit: number = 10;
        const offset: number = (page - 1) * limit;

        const [allTeamGame, total] = await this.teamGameRepository.findAndCount(
            {
                take: 10,
                skip: offset,
                relations: ["team1", "team2"],
                select: {
                    id: true,
                    score1: true,
                    score2: true,
                    team1: { id: true, name: true },
                    team2: { id: true, name: true },
                    createdat: true,
                },
            }
        );

        const formatResponse = {
            content: allTeamGame,
            currentPage: page,
            totalPage: total,
        };

        return formatResponse;
    }
}
