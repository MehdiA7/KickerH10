// 'use server'
// this is a server action component, with this
// you can make api call from client component to server component

import { SoloMatch, TeamMatch } from "@/lib/types/type";

const apiUrl = process.env.API_URL;
export async function FetchSoloMatchByUserId(
    userId: number,
    page: number,
    limit: number
): Promise<SoloMatch[]> {

    const response = await fetch(
        apiUrl + `/game/solo/userId=${userId}/page=${page}/limit=${limit}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const data = await response.json();

    return data.content;

    // const soloScore = [
    //     {
    //         id: 2,
    //         player1: "Michel",
    //         player2: "Pedro",
    //         score1: 11,
    //         score2: 9,
    //         winner: "Michel",
    //         created_at: "5/3/24",
    //     },
    //     {
    //         id: 3,
    //         player1: "Lucas",
    //         player2: "Anna",
    //         score1: 10,
    //         score2: 8,
    //         winner: "Lucas",
    //         created_at: "7/3/24",
    //     },
    //     {
    //         id: 4,
    //         player1: "Thomas",
    //         player2: "Sophie",
    //         score1: 7,
    //         score2: 10,
    //         winner: "Sophie",
    //         created_at: "8/3/24",
    //     },
    //     {
    //         id: 5,
    //         player1: "Marco",
    //         player2: "Laura",
    //         score1: 9,
    //         score2: 10,
    //         winner: "Laura",
    //         created_at: "10/3/24",
    //     },
    //     {
    //         id: 6,
    //         player1: "Michel",
    //         player2: "Lucas",
    //         score1: 11,
    //         score2: 9,
    //         winner: "Michel",
    //         created_at: "12/3/24",
    //     },
    //     {
    //         id: 7,
    //         player1: "Pedro",
    //         player2: "Anna",
    //         score1: 8,
    //         score2: 10,
    //         winner: "Anna",
    //         created_at: "14/3/24",
    //     },
    //     {
    //         id: 8,
    //         player1: "Thomas",
    //         player2: "Marco",
    //         score1: 10,
    //         score2: 6,
    //         winner: "Thomas",
    //         created_at: "16/3/24",
    //     },
    //     {
    //         id: 17,
    //         player1: "Thomas",
    //         player2: "Michel",
    //         score1: 10,
    //         score2: 11,
    //         winner: "Michel",
    //         created_at: "12/4/24",
    //     },
    //     {
    //         id: 18,
    //         player1: "Laura",
    //         player2: "Anna",
    //         score1: 10,
    //         score2: 3,
    //         winner: "Laura",
    //         created_at: "15/4/24",
    //     },
    //     {
    //         id: 19,
    //         player1: "Marco",
    //         player2: "Sophie",
    //         score1: 10,
    //         score2: 9,
    //         winner: "Marco",
    //         created_at: "20/4/24",
    //     },
    //     {
    //         id: 20,
    //         player1: "Pedro",
    //         player2: "Thomas",
    //         score1: 8,
    //         score2: 10,
    //         winner: "Thomas",
    //         created_at: "25/4/24",
    //     },
    //     {
    //         id: 21,
    //         player1: "Lucas",
    //         player2: "Laura",
    //         score1: 11,
    //         score2: 10,
    //         winner: "Lucas",
    //         created_at: "1/5/24",
    //     },
    //     {
    //         id: 22,
    //         player1: "Michel",
    //         player2: "Sophie",
    //         score1: 10,
    //         score2: 7,
    //         winner: "Michel",
    //         created_at: "5/5/24",
    //     },
    // ];

    // return soloScore;
}
// I need to handle status error but is for test actually i make this later.
export async function FetchSoloMatch(
    page: number,
    limit: number
): Promise<SoloMatch[]> {

    const response = await fetch(apiUrl + `/game/solo/page=${page}/limit=${limit}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    return data.content;
}

export async function FetchTeamMatch(page: number, limit: number): Promise<TeamMatch[]> {

    const response = await fetch(apiUrl + `/game/team/page=${page}/limit=${limit}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();

    return data.content;

    // const teamScore = [
    //     {
    //         id: 23,
    //         team1: "Lions",
    //         team2: "Aigles",
    //         score1: 11,
    //         score2: 8,
    //         winner: "Lions",
    //         created_at: "10/5/24",
    //     },
    //     {
    //         id: 24,
    //         team1: "Tigres",
    //         team2: "Panthères",
    //         score1: 10,
    //         score2: 7,
    //         winner: "Tigres",
    //         created_at: "12/5/24",
    //     },
    //     {
    //         id: 25,
    //         team1: "Foudres",
    //         team2: "Tornades",
    //         score1: 9,
    //         score2: 11,
    //         winner: "Tornades",
    //         created_at: "15/5/24",
    //     },
    //     {
    //         id: 26,
    //         team1: "Éclairs",
    //         team2: "Orages",
    //         score1: 10,
    //         score2: 12,
    //         winner: "Orages",
    //         created_at: "18/5/24",
    //     },
    //     {
    //         id: 27,
    //         team1: "Loups",
    //         team2: "Renards",
    //         score1: 11,
    //         score2: 9,
    //         winner: "Loups",
    //         created_at: "20/5/24",
    //     },
    //     {
    //         id: 28,
    //         team1: "Géants",
    //         team2: "Titans",
    //         score1: 8,
    //         score2: 10,
    //         winner: "Titans",
    //         created_at: "22/5/24",
    //     },
    //     {
    //         id: 29,
    //         team1: "Phoenix",
    //         team2: "Dragons",
    //         score1: 7,
    //         score2: 11,
    //         winner: "Dragons",
    //         created_at: "25/5/24",
    //     },
    //     {
    //         id: 30,
    //         team1: "Vikings",
    //         team2: "Spartiates",
    //         score1: 10,
    //         score2: 8,
    //         winner: "Vikings",
    //         created_at: "28/5/24",
    //     },
    //     {
    //         id: 31,
    //         team1: "Gladiateurs",
    //         team2: "Samouraïs",
    //         score1: 11,
    //         score2: 10,
    //         winner: "Gladiateurs",
    //         created_at: "1/6/24",
    //     },
    //     {
    //         id: 32,
    //         team1: "Pirates",
    //         team2: "Corsaires",
    //         score1: 9,
    //         score2: 11,
    //         winner: "Corsaires",
    //         created_at: "3/6/24",
    //     },
    // ];

    // return teamScore;
}
