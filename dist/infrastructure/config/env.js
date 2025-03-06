"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
// src/infrastructure/config/env.ts
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    mongodbUri: process.env['MONGODB_URI'] || 'mongodb://localhost:27017/testdb', // Use ['MONGODB_URI'] with quotes
    redisHost: process.env['REDIS_HOST'] || 'localhost', // Use ['REDIS_HOST'] with quotes
    redisPort: process.env['REDIS_PORT'] || 6379, // Use ['REDIS_PORT'] with quotes
    kafkaBroker: process.env['KAFKA_BROKER'] || 'localhost:9092', // Use ['KAFKA_BROKER'] with quotes
};
