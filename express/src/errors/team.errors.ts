export class TeamNameTakenError extends Error {
    constructor(teamName: string) {
        super(`Team name ${teamName} is already taken`);
        this.name = "TeamNameTakenError";
    }
}