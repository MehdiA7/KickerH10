export class PlayerNotFoundError extends Error {
    constructor(playerId: number) {
        super(`Player with ID ${playerId} not found`);
        this.name = "PlayerNotFoundError";
    }
}