export class PlayerNotFoundError extends Error {
    constructor(playerId: number) {
        super(`Player with ID ${playerId} not found`);
        this.name = "PlayerNotFoundError";
    }
}

export class UsernameIsTaken extends Error {
    constructor(){
        super("This username is taken");
        this.name = "UsernameIsTaken"
    }
}

export class EmailIsTaken extends Error {
    constructor() {
        super("Email is taken");
        this.name = "EmailIsTaken";
    }
}

export class EmailPasswordIsIncorrect extends Error {
    constructor() {
        super("Password or email is incorrect");
        this.name = "EmailPasswordIsIncorrect";
    }
}
