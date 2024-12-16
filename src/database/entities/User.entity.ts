import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./Base.entity";

@Entity("user")
export class User extends Base{
    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    public id: number;

    @Column({name: 'email', type: 'varchar', length: 50, nullable: false})
    public email: string;

    @Column({ name: 'password', type: 'varchar', length: 255, nullable: false})
    public password: string;
}