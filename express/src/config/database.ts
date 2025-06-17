import { DataSource } from "typeorm";
import { join } from "path";

import dotenv from "dotenv";
dotenv.config();

let dbPort;
if (!process.env.DB_PORT) {
    dbPort = 3306;
} else {
    dbPort = parseInt(process.env.DB_PORT);
}

export const AppDataSource = new DataSource({
    type: "mariadb",
    host: process.env.DB_HOST,
    port: dbPort,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [join(__dirname, "..", "entities", "*.entity.{ts,js}")],
    migrations: [join(__dirname, "..", "migrations", "*.{ts,js}")],
    subscribers: [join(__dirname, "..", "subscribers", "*.subscriber.{ts,js}")],
    extra: {
        connectionLimit: 10,
    },
});
