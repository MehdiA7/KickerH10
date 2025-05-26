import { SoloGame } from "../entities/SoloGame.entity";

export type GameData = {
    score1: number;
    score2: number;
    player1: number;
    player2: number;
    winner?: number;
    looser?: number;
}

export type SoloGamePagingResponse = {
    content: SoloGame[],
    totalPage: number
}
