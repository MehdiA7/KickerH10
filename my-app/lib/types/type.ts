
export type ApiResponseFormat<T> = {
    success: boolean;
    message: string;
    content?: T;
}

export type User = {
    username: string;
    xp: number;
    level: number;
    wongame: number;
    lostgame: number;
    wonteamgame: number;
    lostteamgame: number;
}

export type FriendUserList = {
    id: number;
    username: string;
}

export type Match = {
    id: number;
    player1?: string;
    player2?: string;
    team1?: string;
    team2?: string; 
    score1: number;
    score2: number;
    winner: string;
    created_at: string;
};


export type Team = {
    id : number
    name: string,
    player1 : number,
    player2 : number
}
