"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetClientByIdUseCase = void 0;
// src/domain/use-cases/client/get-client-by-id.use-case.ts
const mongoose_1 = __importDefault(require("mongoose"));
const redis_client_1 = require("../../../infrastructure/redis/redis-client"); // Importar a Classe RedisClient
class GetClientByIdUseCase {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
        this.redisClient = new redis_client_1.RedisClient(); // Inicializar o RedisClient no construtor
    }
    async execute(id) {
        const cacheKey = `client:${id}`; // Chave para o cache Redis
        // 1. Tentar obter do cache Redis
        const cachedClientData = await this.redisClient.get(cacheKey); // Usar a instância this.redisClient
        if (cachedClientData) {
            // Cache Hit!
            console.log(`Cache HIT para cliente ID: ${id}`);
            return JSON.parse(cachedClientData); // Desserializar de JSON para Client
        }
        else {
            // Cache Miss!
            console.log(`Cache MISS para cliente ID: ${id}`);
            // 2. Buscar no repositório (banco de dados principal)
            const objectId = new mongoose_1.default.Types.ObjectId(id); // Converter string 'id' para ObjectId
            const clientFromDb = await this.clientRepository.findById(objectId); // Passar ObjectId para findById
            if (clientFromDb) {
                // 3. Armazenar no cache Redis (com TTL de, por exemplo, 300 segundos = 5 minutos)
                await this.redisClient.set(cacheKey, JSON.stringify(clientFromDb), 300); // Usar a instância e passar TTL como argumento separado
                return clientFromDb;
            }
            else {
                return null; // Cliente não encontrado no banco de dados
            }
        }
    }
}
exports.GetClientByIdUseCase = GetClientByIdUseCase;
