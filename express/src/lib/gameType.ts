import { SoloGame } from "../entities/SoloGame.entity"
import { TeamGame } from "../entities/TeamGame.entity";

export type PagingGameFormat<T> = {
    content: T,
    currentPage: number,
    totalPage: number
}

export type MixedSoloAndTeamGame = {
    soloContent: SoloGame[];
    TeamContent: TeamGame[];
}
