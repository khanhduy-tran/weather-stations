import { Device, DeviceHistory, User } from 'src/database/entities';
import { DataSource, DataSourceOptions } from 'typeorm';

require('dotenv').config();

export const databaseConfig: DataSourceOptions = {
    type: (process.env.TYPEORM_CONNECTION || 'postgres') as any,
    host: process.env.TYPEORM_HOST || 'localhost',
    // port: parseInt(process.env.TYPEORM_PORT) || 3306,
    username: process.env.TYPEORM_USERNAME || 'postgres',
    password: process.env.TYPEORM_PASSWORD || 'root',
    database: process.env.TYPEORM_DATABASE || 'weather_stations',
    entities: [
        Device,
        DeviceHistory,
        User
    ],
    migrations: ['dist/database/migrations/*.js'],
    synchronize: true,
  };
  const dataSource = new DataSource(databaseConfig);
  export default dataSource;