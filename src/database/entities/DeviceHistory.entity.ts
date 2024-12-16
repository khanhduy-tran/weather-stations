import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./Base.entity";
import { Device } from "./Device.entity";

@Entity("device_history")
export class DeviceHistory extends Base {
    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    public id: number;

    @Column({ name: 'temperature', type: 'varchar', length: 256, nullable: false })
    public temperature: number;

    @ManyToOne(() => Device, (device) => device.deviceHistory)
    device: Device;
}