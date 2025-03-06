// src/infrastructure/config/env.ts
import dotenv from 'dotenv';

dotenv.config();

export const env = {
  mongodbUri: process.env['MONGODB_URI'] || 'mongodb://localhost:27017/testdb', // Use ['MONGODB_URI'] with quotes
  redisHost: process.env['REDIS_HOST'] || 'localhost',       // Use ['REDIS_HOST'] with quotes
  redisPort: process.env['REDIS_PORT'] || 6379,           // Use ['REDIS_PORT'] with quotes
  kafkaBroker: process.env['KAFKA_BROKER'] || 'localhost:9092', // Use ['KAFKA_BROKER'] with quotes
};