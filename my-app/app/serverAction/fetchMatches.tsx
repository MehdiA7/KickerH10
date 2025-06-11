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
}
