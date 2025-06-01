import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";
import { SoloGame } from "../entities/SoloGame.entity";
import { GameData } from "../lib/soloGameType";
import { Users } from "../entities/Users.entity";
import { PlayerNotFoundError } from "../errors/users.errors";
import { PagingGameFormat } from "../lib/gameType";

export class SoloGameService {
    private soloGameRepository: Repository<SoloGame>;
    private usersRepository: Repository<Users>;

    constructor() {
        this.soloGameRepository = AppDataSource.getRepository(SoloGame);
        this.usersRepository = AppDataSource.getRepository(Users);
    }

    async createANewSoloGame(gameData: GameData): Promise<SoloGame> {
        // Verify user is correct
        const player1 = await this.usersRepository.findOne({
            where: { id: gameData.player1 },
            select: [
                "id",
                "username",
                "level",
                "xp",
                "wongame",
                "lostgame",
                "goal",
            ],
        });
        if (!player1) throw new PlayerNotFoundError(gameData.player1);

        const player2 = await this.usersRepository.findOne({
            where: { id: gameData.player2 },
            select: [
                "id",
                "username",
                "level",
                "xp",
                "wongame",
                "lostgame",
                "goal",
            ],
        });
        if (!player2) throw new PlayerNotFoundError(gameData.player2);

        // Choose the winner
        let winner;
        let looser;
        if (gameData.winner === player1.id) {
            winner = player1;
            looser = player2;
        } else {
            winner = player2;
            looser = player1;
        }

        // Update the user stat
        player1.goal += gameData.score1;
        player2.goal += gameData.score2;

        if (winner === player1) {
            player1.xp += 10;

            if (player1.xp >= 100) {
                player1.level += 1;
                player1.xp = 0;
            }

            player1.wongame += 1;
            player2.lostgame += 1;
            player2.xp += 5;

            if (player2.xp >= 100) {
                player2.level += 1;
                player2.xp = 0;
            }
        } else {
            player2.xp += 10;

            if (player2.xp >= 100) {
                player2.level += 1;
                player2.xp = 0;
            }

            player2.wongame += 1;
            player1.lostgame += 1;
            player1.xp += 5;

            if (player1.xp >= 100) {
                player1.level += 1;
                player1.xp = 0;
            }
        }

        await this.usersRepository.save(player1);
        await this.usersRepository.save(player2);

        const newGame = this.soloGameRepository.create({
            player1: player1,
            score1: gameData.score1,
            player2: player2,
            score2: gameData.score2,
            winner: winner,
            looser: looser,
        });

        return await this.soloGameRepository.save(newGame);
    }

    async getSoloGame(
        page: number,
        limit: number
    ): Promise<PagingGameFormat<SoloGame[]>> {
        const offset: number = (page - 1) * limit;

        const [allSoloGame, total] = await this.soloGameRepository.findAndCount(
            {
                take: limit,
                skip: offset,
                relations: ["player1", "player2"],
                select: {
                    id: true,
                    score1: true,
                    score2: true,
                    player1: { id: true, username: true },
                    player2: { id: true, username: true },
                    createdat: true,
                },
                order: { createdat: "DESC" },
            }
        );

        const totalPages = Math.ceil(total / limit);

        const formatResponse = {
            content: allSoloGame,
            currentPage: page,
            totalPage: totalPages,
        };

        return formatResponse;
    }

    async getSoloGameWithUser(
        userId: number,
        page: number,
        limit: number
    ): Promise<PagingGameFormat<SoloGame[]>> {
        const offset: number = (page - 1) * limit;

        const [allUserSoloGame, total] =
            await this.soloGameRepository.findAndCount({
                take: limit,
                skip: offset,
                where: [
                    { player1: { id: userId } },
                    { player2: { id: userId } },
                    { winner: { id: userId } },
                    { looser: { id: userId } },
                ],
                relations: ["player1", "player2", "winner", "looser"],
                select: {
                    id: true,
                    score1: true,
                    score2: true,
                    player1: {
                        id: true,
                        username: true,
                    },
                    player2: {
                        id: true,
                        username: true,
                    },
                    winner: {
                        id: true,
                        username: true
                    },
                    looser: {
                        id: true,
                        username: true
                    }
                },
            });

        const totalPages = Math.ceil(total / limit);

        const formatResponse = {
            content: allUserSoloGame,
            currentPage: page,
            totalPage: totalPages,
        };

        return formatResponse;
    }
}
