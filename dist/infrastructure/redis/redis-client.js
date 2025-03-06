"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
// src/infrastructure/redis/redis-client.ts
const ioredis_1 = __importDefault(require("ioredis"));
const env_1 = require("../config/env");
class RedisClient {
    constructor() {
        this.redis = new ioredis_1.default({
            host: env_1.env.redisHost,
            port: parseInt(env_1.env.redisPort, 10),
        });
        this.redis.on('connect', () => console.log('Conectado ao Redis'));
        this.redis.on('error', (err) => console.error('Erro na conexão Redis', err));
    }
    async get(key) {
        return this.redis.get(key);
    }
    async set(key, value, expirySeconds) {
        if (expirySeconds) {
            await this.redis.set(key, value, 'EX', expirySeconds);
        }
        else {
            await this.redis.set(key, value);
        }
    }
    async del(key) {
        await this.redis.del(key);
    }
}
exports.RedisClient = RedisClient;
