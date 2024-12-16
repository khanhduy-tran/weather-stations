import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from 'src/database/entities';
import { Repository } from 'typeorm';
import { AddDevice } from './request/add-device.dto';

@Injectable()
export class DeviceService {
    constructor(
        @InjectRepository(Device)
        private deviceRepository: Repository<Device>
    ) { }

    async addDevice(data: AddDevice): Promise<any> {
        const device = this.deviceRepository.create({
            name: data.name,
            description: data.description
        });
        await this.deviceRepository.save(device);

        return device;
    }

    async getDevices(): Promise<Device[]> {
        return this.deviceRepository.find({ where: {} });
    }

    async getDeviceById(id: number) {
        return this.deviceRepository.findOne({ where: { id } });
    }
}
