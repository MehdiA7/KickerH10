import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users.entity";
import { TeamGame } from "./TeamGame.entity";

@Entity()
export class Team {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToOne(() => Users, (user) => user.team_player_id1)
    player1!: Users[];

    @ManyToOne(() => Users, (user) => user.team_player_id2)
    player2!: Users[];

    @Column()
    wongame: number = 0;

    @Column()
    lostgame: number = 0;

    @CreateDateColumn()
    createdat!: Date;

    @OneToMany(() => TeamGame, (teamgame) => teamgame.team_1)
    teamid1!: TeamGame[];

    @OneToMany(() => TeamGame, (teamgame) => teamgame.team_2)
    teamid2!: TeamGame[];
}
