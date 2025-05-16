export type RegisterCredential = {
    username: string;
    email: string;
    password: string;
    country: string;
}

export type LoginCredential = {
    email: string;
    password: string;
}

export type LoginResponse<T> = {
    success: boolean;
    message: string;
    content: T;
    token: string;
}

export type CookieUserInformation = {
    id: string;
    username: string;
}
