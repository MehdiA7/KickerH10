// 'use server'
// this is a server action component, with this
// you can make api call from client component to server component

import { NewSoloGame } from "@/lib/schema/newGame";
import { ApiResponseFormat, SoloMatch, TeamMatch } from "@/lib/types/type";

const apiUrl = process.env.API_URL || "No API";

// ================== CREATE SOLO MATCH ========================
export async function FetchCreateSoloMatch(
    body: NewSoloGame
): Promise<ApiResponseFormat<NewSoloGame>> {
    try {
        const response = await fetch(apiUrl + `/game/solo`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        console.log(response.status);

        const data = await response.json();

        return data;
    } catch (error) {
        return { success: false, message: `Something wrong... : ${error}` };
    }
}

// ================== GET MATCH BY USER ID =====================
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
// ================== GET RECENT SOLO MATCH ====================
export async function FetchSoloMatch(
    page: number,
    limit: number
): Promise<SoloMatch[]> {
    const response = await fetch(
        apiUrl + `/game/solo/page=${page}/limit=${limit}`,
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

// ================== GET RECENT TEAM MATCH =====================
export async function FetchTeamMatch(
    page: number,
    limit: number
): Promise<TeamMatch[]> {
    const response = await fetch(
        apiUrl + `/game/team/page=${page}/limit=${limit}`,
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
