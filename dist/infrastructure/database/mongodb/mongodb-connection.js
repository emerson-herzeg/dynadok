"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBConnection = void 0;
// src/infrastructure/database/mongodb/mongodb-connection.ts
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../../config/env");
class MongoDBConnection {
    static async connect() {
        try {
            await mongoose_1.default.connect(env_1.env.mongodbUri);
            console.log('Conectado ao MongoDB');
        }
        catch (error) {
            console.error('Erro ao conectar ao MongoDB', error);
            process.exit(1); // Encerra a aplicação em caso de falha na conexão
        }
    }
}
exports.MongoDBConnection = MongoDBConnection;
