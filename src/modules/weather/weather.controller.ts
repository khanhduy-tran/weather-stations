import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WeatherService } from './weather.service';
import { AddLogDevice } from './request/add-log-device.dto';
import { DeviceService } from '../device/device.service';
import { ApiCauses } from 'src/config/exception/apiCauses';

@Controller('weather')
@ApiTags('weather')
export class WeatherController {
    constructor(
        private readonly weatherService: WeatherService,
        private readonly deviceService: DeviceService
    ) { }

    @Post('')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Successful',
    })
    async addDevice(@Body() data: AddLogDevice): Promise<any> {
        const device = await this.deviceService.getDeviceById(data.deviceId);
        if (!device) throw ApiCauses.DEVICE_INVALID;
        return this.weatherService.addLogDevice(data);
    }

    @Get('/history-devices')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Successful',
    })
    async historyDevices() {
        return this.weatherService.getHistoryDevices();
    }

    @Get('/history-device-by-id/:id')
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Successful',
    })
    async historyDeviceById(@Param('id') id: number) {
        const device = await this.deviceService.getDeviceById(id);
        if (!device) throw ApiCauses.DEVICE_INVALID;
        return this.weatherService.getHistoryDeviceById(id);
    }
}
