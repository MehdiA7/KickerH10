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

        // Verify user si correct
        const player1 = await this.usersRepository.findOne({
            where: { id: gameData.player1 },
            select: ["id", "username"],
        });
        if (!player1) throw new PlayerNotFoundError(gameData.player1);

        const player2 = await this.usersRepository.findOne({
            where: { id: gameData.player2 },
            select: ["id", "username"],
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

    async getSoloGame(page: number): Promise<PagingGameFormat<SoloGame[]>> {
        const limit: number = 10;
        const offset: number = (page - 1) * limit;

    const [allSoloGame, total] = await this.soloGameRepository
    .findAndCount({
        take: 10,
        skip: offset,
        relations: ['player1', 'player2'],
        select: {
            id: true,
            score1: true,
            score2: true,
            player1: { id: true, username: true},
            player2: { id: true, username: true},
            createdat: true
        }
    });

    const formatResponse = {
        content: allSoloGame,
        currentPage: page,
        totalPage: total-1
    }
        
            return formatResponse;
    }
}
