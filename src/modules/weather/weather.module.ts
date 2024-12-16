import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device, DeviceHistory } from 'src/database/entities';
import { WeatherController } from './weather.controller';
import { DeviceService } from '../device/device.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Device, DeviceHistory])
  ],
  controllers: [WeatherController],
  providers: [WeatherService, DeviceService]
})
export class WeatherModule {}
