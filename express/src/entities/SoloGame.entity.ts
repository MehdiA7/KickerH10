import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users.entity";

@Entity()
export class SoloGame {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Users, (user) => user.playerid1)
    player1!: Users;

    @ManyToOne(() => Users, (user) => user.playerid2)
    player2!: Users;

    @Column()
    score1!: number;

    @Column()
    score2!: number;

    @ManyToOne(() => Users, (user) => user.winnerid)
    winner!: Users;

    @ManyToOne(() => Users, (user) => user.looserid)
    looser!: Users;

    @CreateDateColumn()
    createdat!: Date;
}
