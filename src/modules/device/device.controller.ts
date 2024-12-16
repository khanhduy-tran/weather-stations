import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeviceService } from './device.service';
import { AddDevice } from './request/add-device.dto';
import { Device } from 'src/database/entities';

@Controller('device')
@ApiTags('device')
export class DeviceController {
    constructor(
        private readonly deviceService: DeviceService
    ) { }

    @Post('')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Successful',
    })
    async addDevice(@Body() data: AddDevice): Promise<any> {
        return this.deviceService.addDevice(data);
    }

    @Get('')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Successful',
    })
    async getDevices() {
        return this.deviceService.getDevices();
    }
}
