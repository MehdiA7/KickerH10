export class FriendRequestDoesntExist extends Error {
    constructor() {
        super("This friend request doesn't exist");
        this.name = "FriendRequestDoesntExist";
    }
}