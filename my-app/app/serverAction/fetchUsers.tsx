// "use server"

export function FetchUserProfile() {
    const user = 
        {
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

export function FetchFriendWithUserId() {
    const userList = [
        {
            id: 4,
            username: "Hugo"
        },
        {
            id: 5,
            username: "Martin"
        },
        {
            id: 6,
            username: "Robin"
        },
        {
            id: 7,
            username: "Nico"
        },
        {
            id: 8,
            username: "Pierre"
        },
        {
            id: 9,
            username: "Scott Borlon"
        },
        {
            id: 10,
            username: "Bryan Charles"
        },
        {
            id: 11,
            username: "Lucas Cloes"
        },
        {
            id: 12,
            username: "Denis Collette"
        },
        {
            id: 13,
            username: "Emmanuel Cuiret"
        },
        
    ];

    return userList;
}

export function FetchRecentUserMatch() {
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
        }
    ]
    return userMatch;
}
