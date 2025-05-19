export type RegisterBody = {
    username: string;
    email: string;
    password: string;
    country: string;
}

export type EmailExist = {
    email: string;
}

export type LoginBody = {
    id: number;
    firstname: string;
    email: string;
    password: string;
}

export type LoginResponseContent = {
    id: number;
    username: string;
}

export type LoginResponse = {
    content: LoginResponseContent;
    token: string;
}
