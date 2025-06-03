"use server"
import { User } from "@/lib/types/type";

const apiUrl = process.env.API_URL;

export async function FetchUserProfile(id: number) {
    // fake data
    // const user =
    //     {
    //         username: "QuentinLeS",
    //         xp: 83,
    //         level: 4,
    //         won_game: 32,
    //         lost_game: 21,
    //         won_team_game: 10,
    //         lost_team_game: 4,
    //     };

    const user = await fetch(`${apiUrl}/user/${id}`, {
        method: "GET",
    });

    const data = await user.json();

    return data.content;
}

export async function FetchUserProfileByName(name: string) {
    const user = {
        id: 0,
        username: "QuentinLeS",
        xp: 83,
        level: 4,
        won_game: 32,
        lost_game: 21,
        won_team_game: 10,
        lost_team_game: 4,
    };

    return user;
}

export async function FetchFriendWithUserId(id: number) {
    const userList = [
        {
            id: 4,
            username: "Hugo",
        },
        {
            id: 5,
            username: "Martin",
        },
        {
            id: 6,
            username: "Robin",
        },
        {
            id: 7,
            username: "Nico",
        },
        {
            id: 8,
            username: "Pierre",
        },
        {
            id: 9,
            username: "Scott Borlon",
        },
        {
            id: 10,
            username: "Bryan Charles",
        },
        {
            id: 11,
            username: "Lucas Cloes",
        },
        {
            id: 12,
            username: "Denis Collette",
        },
        {
            id: 13,
            username: "Emmanuel Cuiret",
        },
    ];

    return userList;
}

export async function FetchUserByUsername(userInput: string): Promise<User[]> {
    const response = await fetch(`${apiUrl}/user/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            input: userInput
        }),
    });

    const data = await response.json();
    
    return data.content;
}

export async function FetchRecentUserMatch(id: number) {
    const userMatch = [
        {
            id: 2,
            player1: "QuentinLeS",
            player2: "Pedro",
            score1: 11,
            score2: 9,
            winner: "QuentinLeS",
            created_at: "28/3/25",
        },
        {
            id: 4,
            player1: "QuentinLeS",
            player2: "Hugo",
            score1: 1,
            score2: 11,
            winner: "Hugo",
            created_at: "21/3/25",
        },
        {
            id: 5,
            player1: "Nicoach",
            player2: "QuentinLeS",
            score1: 11,
            score2: 5,
            winner: "Nicoach",
            created_at: "15/3/25",
        },
        {
            id: 11,
            player1: "Antoine",
            player2: "QuentinLeS",
            score1: 10,
            score2: 11,
            winner: "QuentinLeS",
            created_at: "3/3/25",
        },
        {
            id: 234,
            player1: "Lucas",
            player2: "QuentinLeS",
            score1: 11,
            score2: 4,
            winner: "Lucas",
            created_at: "3/3/25",
        },
    ];
    return userMatch;
}

export async function FetchAddFriend() {
    let postObj = {
        user: 1,
        friend: 2,
    };

    return "friend added successfully";
}

export async function FetchCheckIsFriend(idPlayer1: number, idPlayer2: number) {
    let postObj = {
        player1: idPlayer1,
        player2: idPlayer2,
    };

    return "true or false";
}

export async function FetchAddNewFriend(idPlayer1: number, idPlayer2: number) {
    let postObj = {
        user: idPlayer1,
        friend: idPlayer2,
    };
    console.log("you are now friends");
    return 0;
}

export async function FetchRemoveFriend(idUser: number, idFriend: number) {
    // delte the foreign table containig those 2 id
    return;
}
