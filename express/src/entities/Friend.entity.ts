import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./Users.entity";

@Entity()
export class Friend {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Users, (user) => user.friends)
    user!: Users;

    @ManyToOne(() => Users, (user) => user.friendsOf)
    friend!: Users;

    @Column({ default: false })
    accepted!: boolean;

    @CreateDateColumn()
    createdat!: Date;
}
