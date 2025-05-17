import { AppDataSource } from "../config/database";
import { Repository } from "typeorm";
import { SoloGame } from "../entities/SoloGame.entity";
import { GameData } from "../lib/soloType";
import { Users } from "../entities/Users.entity";

export class SoloGameService {
    private soloGameRepository: Repository<SoloGame>;
    private usersRepository: Repository<Users>;

    constructor() {
        this.soloGameRepository = AppDataSource.getRepository(SoloGame);
        this.usersRepository = AppDataSource.getRepository(Users);
    }

    async createANewSoloGame(gameData: GameData): Promise<SoloGame> {

        // Verify user si correct
        const player1 = await this.usersRepository.findOne({
            where: { username: gameData.player1 },
            select: ["id", "username"],
        });
        if (!player1) throw new Error("Player 1 not found");

        const player2 = await this.usersRepository.findOne({
            where: { username: gameData.player2 },
            select: ["id", "username"],
        });
        if (!player2) throw new Error("Player 2 not found");

        // Choose the winner
        let winner;
        let looser;
        if (gameData.winner === player1.username) {
            winner = player1;
            looser = player2;
        } else {
            winner = player2;
            looser = player1;
        }

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
}
