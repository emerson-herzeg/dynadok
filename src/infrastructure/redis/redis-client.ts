// src/infrastructure/redis/redis-client.ts
import Redis from 'ioredis';
import { env } from '../config/env';

export class RedisClient {
  private redis: Redis;

  constructor() {
    this.redis = new Redis({
      host: env.redisHost,
      port: parseInt(env.redisPort as string, 10),
    });

    this.redis.on('connect', () => console.log('Conectado ao Redis'));
    this.redis.on('error', (err) => console.error('Erro na conexão Redis', err));
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, expirySeconds?: number): Promise<void> {
    if (expirySeconds) {
      await this.redis.set(key, value, 'EX', expirySeconds);
    } else {
      await this.redis.set(key, value);
    }
  }

  async del(key: string): Promise<void> {
    await this.redis.del(key);
  }
}