export type ApiResponseFormat<T> = {
    success: boolean;
    message: string;
    content?: T;
};

export type User = {
    id: number;
    username: string;
    xp: number;
    level: number;
    goal: number;
    wongame: number;
    lostgame: number;
    wonteamgame: number;
    lostteamgame: number;
};

export type FriendUserList = {
    id: number;
    friend: User;
    accepted: boolean;
};

export type CreateFriendBody = {
    user: number;
    friend: number;
}

export type SoloMatch = {
    id: number;
    score1: number;
    score2: number;
    player1: User;
    player2: User;
    winner: User;
    looser: User;
    createdat: Date;
};

export type Team = {
    id: number;
    name: string;
    player1: User;
    player2: User;
    wongame: number;
    lostgame: number;
    goal: number;
    createdat: Date;
};

export type TeamMatch = {
    id: number;
    team1: Team;
    team2: Team;
    winner: number;
    score1: number;
    score2: number;
    createdat: Date;
};
