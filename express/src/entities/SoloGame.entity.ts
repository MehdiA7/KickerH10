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

    @ManyToOne(() => Users, (user) => user.player_id1)
    player1!: Users[];

    @ManyToOne(() => Users, (user) => user.player_id2)
    player2!: Users[];

    @Column()
    score_1!: number;

    @Column()
    score_2!: number;

    @ManyToOne(() => Users, (user) => user.winner_id)
    winner!: Users[];

    @ManyToOne(() => Users, (user) => user.looser_id)
    looser!: Users[];

    @CreateDateColumn()
    created_at!: Date;
}
