import type { RedisClusterOptions } from 'redis';
import { CacheModuleOptions } from '@nestjs/cache-manager';
import { redisClusterStore } from 'cache-manager-redis-yet';

// export const redisClusterOption: RedisClusterOptions = {
//   rootNodes: [{ url: `rediss://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}` }],
//   defaults: {
//     password: process.env.REDIS_PASSWORD,
//     socket: {
//       tls: true,
//     },
//   },
// };

// export const redisClusterConfig: CacheModuleOptions<RedisClusterOptions> = {
//   store: redisClusterStore,
//   ttl: Number(process.env.EXPRIRE_TIME_CODE) / 1000,
//   isGlobal: true,
//   ...redisClusterOption,
// };