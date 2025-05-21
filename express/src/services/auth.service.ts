import { Repository } from "typeorm";
import { AppDataSource } from "../config/database";
import { Users } from "../entities/Users.entity";
import { LoginBody, LoginResponse, RegisterBody } from "../lib/connectionType";
import * as bcrypt from "bcrypt";
import { EmailIsTaken, EmailPasswordIsIncorrect, UsernameIsTaken } from "../errors/users.errors";
const jwt = require("jsonwebtoken");



export class AuthService {

    private usersRepository: Repository<Users>;

    constructor() {
        this.usersRepository = AppDataSource.getRepository(Users);
    }

    async create(userData: RegisterBody): Promise<Users> {
        const verifyEmail = await this.usersRepository.exists({
            where: { email: userData.email },
        });
        if (verifyEmail) throw new EmailIsTaken();

        const verifyUsername = await this.usersRepository.exists({
            where: {username: userData.username},
        })
        if (verifyUsername) throw new UsernameIsTaken();

        // hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const newUser = this.usersRepository.create({
            username: userData.username,
            email: userData.email,
            password: hashedPassword,
            country: userData.country,
        });

        return await this.usersRepository.save(newUser);
    }

    async login(userData: LoginBody): Promise<LoginResponse> {
        //verif email et password et jwt
        const verifyEmail = await this.usersRepository.findOne({
            where: { email: userData.email },
            select: ["id", "email", "username", "password"],
        });
        if (verifyEmail === null) throw new EmailPasswordIsIncorrect();

        const passwordVerification = await bcrypt.compare(
            userData.password,
            verifyEmail.password
        );
        if (!passwordVerification) throw new EmailPasswordIsIncorrect();

        const jwtToken = await jwt.sign(
            { username: "Paul" },
            process.env.SECRET,
            {
                expiresIn: "1h",
            }
        );

        const goodResponse = {
            content: {
                id: verifyEmail.id,
                username: verifyEmail.username
            },
            token: jwtToken
        }
        return goodResponse;
    }
}