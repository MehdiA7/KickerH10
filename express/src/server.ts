import express, { Request, Response } from "express";
import { logger } from "./middleware/logger";
import { AppDataSource } from "./config/database";
import "reflect-metadata";
import authRouter from "./routes/auth.routes";

const cors = require("cors");

import dotenv from "dotenv";
import soloGameRouter from "./routes/soloGame.routes";
import teamRouter from "./routes/team.routes";
import friendRouter from "./routes/friend.routes";
import usersRouter from "./routes/user.routes";
import teamGameRouter from "./routes/teamGame.route";
import gameRouter from "./routes/game.routes";
dotenv.config();

const PORT = process.env.SERVER_PORT

console.log(process.env.DB_HOST)

const startServer = async () => {
    try {
        // Start database connection
        await AppDataSource.initialize();
        console.log("Connected to db");
        
        const app = express();

        // Cors configuration
        var corsOptions = {
            origin: ["http://localhost:3000"],
            methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
            preflightContinue: false,
            optionsSuccessStatus: 204,
        };
        app.use(cors(corsOptions));

        // Route
        app.use("/", authRouter);
        app.use("/game", gameRouter);
        app.use("/game/solo", soloGameRouter);
        app.use("/game/team", teamGameRouter);
        app.use("/team", teamRouter);
        app.use("/friend", friendRouter);
        app.use("/user", usersRouter);

        // Test route
        app.get(
            "/",
            logger,
            (req: Request, res: Response) => {
                res.status(200).send({ message: "The api work well !" });
            }
        );

        app.listen(PORT, () => {
            console.log("Server is started ! => PORT :", PORT);
        });
    } catch (error) {
        console.error("Error with the DB", error);
    }
};

startServer();
