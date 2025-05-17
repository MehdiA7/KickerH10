import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Team } from "./Team.entity";

@Entity()
export class TeamGame {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Team, (team) => team.teamid1)
    team1!: Team[];

    @ManyToOne(() => Team, (team) => team.teamid2)
    team2!: Team[];

    @Column()
    wongame: number = 0;

    @Column()
    lostgame: number = 0;

    @Column()
    score1!: number;

    @Column()
    score2!: number;

    @CreateDateColumn()
    createdat!: Date;
}
