import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./Base.entity";
import { DeviceHistory } from "./DeviceHistory.entity";

@Entity("device")
export class Device extends Base{
    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    public id: number;

    @Column({ name: 'name', type: 'varchar', length: 256, nullable: false })
    public name: string;

    @Column({ name: 'description', type: 'varchar', length: 256, nullable: true })
    public description: string;

    @OneToMany(() => DeviceHistory, (deviceHistory => deviceHistory.device))
    public deviceHistory: DeviceHistory;
}