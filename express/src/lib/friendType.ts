import { Users } from "../entities/Users.entity";

export type FriendData = {
    user: number;
    friend: number;
};

export type FriendList = {
    id: number;
    friend: Users;
    accepted: boolean;
};
