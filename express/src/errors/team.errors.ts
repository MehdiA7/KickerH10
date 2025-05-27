export class TeamNameTakenError extends Error {
    constructor(teamName: string) {
        super(`Team name ${teamName} is already taken`);
        this.name = "TeamNameTakenError";
    }
}
export class TeamNotFoundError extends Error {
    constructor(teamid: number) {
        super(`Team with ID ${teamid} not found`);
        this.name = "TeamNotFoundError";
    }
}
