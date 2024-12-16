import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeviceHistory } from 'src/database/entities';
import { Repository } from 'typeorm';
import { AddLogDevice } from './request/add-log-device.dto';
import { DeviceService } from '../device/device.service';

@Injectable()
export class WeatherService {
    constructor(
        @InjectRepository(DeviceHistory)
        private deviceHistoryRepository: Repository<DeviceHistory>
    ) { }

    async addLogDevice(data: AddLogDevice) {
        return this.deviceHistoryRepository.save(this.deviceHistoryRepository.create({
            temperature: data.temperature,
            device: { id: data.deviceId }
        }));
    }

    async getHistoryDevices(): Promise<DeviceHistory[]> {
        return this.deviceHistoryRepository.find({ where: {}, relations: { device: true } });
    }

    async getHistoryDeviceById(id: number): Promise<DeviceHistory[]> {
        return this.deviceHistoryRepository.find({ where: { device: { id } }, relations: { device: true } });
    }
}
