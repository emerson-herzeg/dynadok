// src/domain/use-cases/client/get-client-by-id.use-case.ts
import mongoose from 'mongoose';
import { ClientRepository } from '../../repositories/ClientRepository';
import { Client } from '../../entities/client-entity';
import { RedisClient as RedisClientClass } from '../../../infrastructure/redis/redis-client'; // Importar a Classe RedisClient

export class GetClientByIdUseCase {
  private redisClient: RedisClientClass; // Instância do RedisClient

  constructor(private clientRepository: ClientRepository) {
    this.redisClient = new RedisClientClass(); // Inicializar o RedisClient no construtor
  }

  async execute(id: string): Promise<Client | null> {
    const cacheKey = `client:${id}`; // Chave para o cache Redis

    // 1. Tentar obter do cache Redis
    const cachedClientData = await this.redisClient.get(cacheKey); // Usar a instância this.redisClient

    if (cachedClientData) {
      // Cache Hit!
      console.log(`Cache HIT para cliente ID: ${id}`);
      return JSON.parse(cachedClientData) as Client; // Desserializar de JSON para Client
    } else {
      // Cache Miss!
      console.log(`Cache MISS para cliente ID: ${id}`);

      // 2. Buscar no repositório (banco de dados principal)
      const objectId = new mongoose.Types.ObjectId(id); // Converter string 'id' para ObjectId
      const clientFromDb = await this.clientRepository.findById(objectId); // Passar ObjectId para findById

      if (clientFromDb) {
        // 3. Armazenar no cache Redis (com TTL de, por exemplo, 300 segundos = 5 minutos)
        await this.redisClient.set(cacheKey, JSON.stringify(clientFromDb), 300); // Usar a instância e passar TTL como argumento separado
        return clientFromDb;
      } else {
        return null; // Cliente não encontrado no banco de dados
      }
    }
  }
}