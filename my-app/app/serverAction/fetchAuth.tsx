"use server";
import { CookieUserInformation, LoginCredential, LoginResponse, RegisterCredential } from "@/lib/types/authTypes";
import { ApiResponseFormat } from "@/lib/types/type";
import { cookies } from "next/headers";

const Api: string = process.env.API_URL || "NO API";

export const createANewUser = async (
    body: RegisterCredential
): Promise<ApiResponseFormat<RegisterCredential>> => {
    try {
        const response = await fetch(`${Api}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.status === 409)
            return { success: false, message: "This email is already used..." };

        if (response.status === 201) {
            const data = await response.json();
            return {
                success: true,
                message: "Your account is created !",
                content: data,
            };
        }

        return { success: false, message: "We have a problem..." };
    } catch (error) {
        return { success: false, message: `Something wrong... : ${error}` };
    }
};

export const login = async (
    body: LoginCredential
): Promise<ApiResponseFormat<LoginCredential>> => {
    try {
        const response = await fetch(`${Api}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (response.status === 401)
            return {
                success: false,
                message: "Email or password is incorrect",
            };

        const data: LoginResponse<CookieUserInformation> = await response.json();

        const cookieStore = await cookies();

        cookieStore.set({
            name: "Authorization",
            value: data.token,
            httpOnly: true,
            path: "/",
        });
        cookieStore.set({
            name: "ActualUserId",
            value: data.content.id,
            httpOnly: false,
            path: "/",
        });
        cookieStore.set({
            name: "ActualUser",
            value: data.content.username,
            httpOnly: false,
            path: "/",
        });

        return {
            success: true,
            message: "You are logged !"
        };
    } catch (error) {
        return { success: false, message: `Somthing wrong... ${error}` };
    }
};
