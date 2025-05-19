import { AppDataSource } from "../config/database";
import { Users } from "../entities/Users.entity";
import { Repository } from "typeorm";
import { LoginBody, LoginResponse, RegisterBody } from "../lib/connectionType";
import * as bcrypt from "bcrypt";
import { EmailPasswordIsIncorrect } from "../errors/users.errors";
const jwt = require("jsonwebtoken");

export class UsersService {
    private usersRepository: Repository<Users>;

    constructor() {
        this.usersRepository = AppDataSource.getRepository(Users);
    }

    async findAll(): Promise<Users[]> {
        return await this.usersRepository.find();
    }

    async findById(id: number): Promise<Users | null> {
        return await this.usersRepository.findOneBy({ id });
    }

    async create(userData: RegisterBody): Promise<Users> {
        const verifyEmail = await this.usersRepository.findOne({
            where: { email: userData.email },
            select: ["id", "email", "username", "password"],
        });
        if (verifyEmail === null) throw new EmailPasswordIsIncorrect();

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

    async update(id: number, data: Partial<Users>): Promise<Users | null> {
        await this.usersRepository.update(id, data);
        return await this.findById(id);
    }

    async delete(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
