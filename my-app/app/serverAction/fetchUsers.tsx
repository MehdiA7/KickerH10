"use server";
import { ApiResponseFormat, CreateFriendBody, User } from "@/lib/types/type";

const apiUrl = process.env.API_URL;

// ==================== GET USER BY ID ===================
export async function FetchUserProfile(id: number) {
    const user = await fetch(`${apiUrl}/user/id=${id}`, {
        method: "GET",
    });

    const data = await user.json();

    return data.content;
}

// ==================== SEARCH USER BY USERNAME ===========================
export async function SearchUserByUsername(userInput: string): Promise<User[]> {
    const response = await fetch(`${apiUrl}/user/search`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            input: userInput,
        }),
    });

    const data = await response.json();

    return data.content;
}

// ==================== FIND BY USERNAME 1 USER ==============================
export async function FetchUserByUsername(username: string): Promise<User> {
    const response = await fetch(`${apiUrl}/user/username=${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    return data.content;
}

// ==================== GET ALL USER FRIEND BY USER ID ===================
export async function FetchFriendWithUserId(
    id: number,
    page: number,
    limit: number
) {
    const user = await fetch(
        `${apiUrl}/friend/id=${id}/page=${page}/limit=${limit}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    const data = await user.json();

    return data.content;
}

// ==================== CREATE NEW FRIEND CONNECTION =========================
export async function FetchCreateNewFriendConnection(body: CreateFriendBody) {
    try {
        const response = await fetch(apiUrl + `/friend`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        return {
            success: false,
            message: `Something wrong... : ${error}`,
        };
    }
}

// ===================== CHECK IF IS FRIEND ========================

export async function FetchIfIsFriend(
    userId: number,
    friendId: number
): Promise<ApiResponseFormat<boolean>> {
    try {
        const response = await fetch(
            apiUrl + `/friend/userId=${userId}/friendId=${friendId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();

        return {
            success: true,
            message: "Are you friend ?",
            content: data,
        };
    } catch (error) {
        return {
            success: false,
            message: `Something wrong... : ${error}`,
        };
    }
}
