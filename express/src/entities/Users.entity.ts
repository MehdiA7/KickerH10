import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Friend } from "./Friend.entity";
import { SoloGame } from "./SoloGame.entity";
import { Team } from "./Team.entity";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column()
    email!: string;

    @Column()
    country!: string;

    @Column()
    level: number = 0;

    @Column()
    xp: number = 0;

    @Column()
    goal: number = 0;

    @Column()
    wongame: number = 0;

    @Column()
    lostgame: number = 0;

    @Column()
    wonteamgame: number = 0;

    @Column()
    lostteamgame: number = 0;

    @CreateDateColumn()
    createdat!: Date;

    @OneToMany(() => Friend, (friend) => friend.user)
    friends!: Friend[];

    @OneToMany(() => Friend, (friend) => friend.friend)
    friendsOf!: Friend[];

    @OneToMany(() => SoloGame, (game) => game.player1)
    playerid1!: SoloGame[];

    @OneToMany(() => SoloGame, (game) => game.player2)
    playerid2!: SoloGame[];

    @OneToMany(() => SoloGame, (game) => game.winner)
    winnerid!: SoloGame[];

    @OneToMany(() => SoloGame, (game) => game.looser)
    looserid!: SoloGame[];

    @OneToMany(() => Team, (team) => team.player1)
    teamplayerid1!: Team[];

    @OneToMany(() => Team, (team) => team.player2)
    teamplayerid2!: Team[];
}
