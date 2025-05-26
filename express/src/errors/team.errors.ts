export class TeamNameTakenError extends Error {
    constructor(teamName: string) {
        super(`Team name ${teamName} is already taken`);
        this.name = "TeamNameTakenError";
    }
}
export class TeamNotFoundError extends Error {
    constructor(teamid: number) {
        super(`Player with ID ${teamid} not found`);
        this.name = "PlayerNotFoundError";
    }
}
