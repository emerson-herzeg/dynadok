// src/application/controllers/client.controller.ts
import { Request, Response } from 'express';
import { CreateClientUseCase } from '../../domain/use-cases/client/create-client.use-case';
import { GetClientByIdUseCase } from '../../domain/use-cases/client/get-client-by-id.use-case';
import { ListClientsUseCase } from '../../domain/use-cases/client/list-clients.use-case';
import { UpdateClientUseCase } from '../../domain/use-cases/client/update-client.use-case';
import { DeleteClientUseCase } from '../../domain/use-cases/client/delete-client.use-case';
// import { ClientRepository } from '../../domain/repositories/ClientRepository';
import { RedisClient } from '../../infrastructure/redis/redis-client';
import { KafkaProducer } from '../../infrastructure/message-broker/kafka/kafka-producer';

export class ClientController {
  private redisClient: RedisClient;
  private kafkaProducer: KafkaProducer;

  constructor(
    private createClientUseCase: CreateClientUseCase,
    private getClientByIdUseCase: GetClientByIdUseCase,
    private listClientsUseCase: ListClientsUseCase,
    private updateClientUseCase: UpdateClientUseCase,
    private deleteClientUseCase: DeleteClientUseCase,
    //private clientRepository: ClientRepository // Injeção do repositório para usar no cache
  ) {
    this.redisClient = new RedisClient();
    this.kafkaProducer = new KafkaProducer();
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { nome, email, telefone } = req.body;
      const client = await this.createClientUseCase.execute(nome, email, telefone);

      // Publicar mensagem no Kafka (simples log)
      this.kafkaProducer.produce('client-events', `Cliente ${client.nome} (ID: ${client._id}) cadastrado.`);

      return res.status(201).json(client);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const clientId = req.params['id'];
      if (!clientId) { // Verifica se clientId existe
        return res.status(400).json({ message: "ID do cliente não fornecido" }); // Retorna erro se não existir
    }
      // Tentar obter do cache primeiro
      const cachedClient = await this.redisClient.get(`client:${clientId}`);
      if (cachedClient) {
        return res.status(200).json(JSON.parse(cachedClient));
      }

      const client = await this.getClientByIdUseCase.execute(clientId);
      if (!client) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      // Salvar no cache
      await this.redisClient.set(`client:${clientId}`, JSON.stringify(client));

      return res.status(200).json(client);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async list(_req: Request, res: Response): Promise<Response> {
    try {
      const clients = await this.listClientsUseCase.execute();
      return res.status(200).json(clients);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const clientId = req.params['id'];
      if (!clientId) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
      const { nome, email, telefone } = req.body;
      const updatedClient = await this.updateClientUseCase.execute(clientId, nome, email, telefone);

      if (!updatedClient) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      // Invalida o cache para este cliente
      await this.redisClient.del(`client:${clientId}`);

      return res.status(200).json(updatedClient);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const clientId = req.params['id'];
      if (!clientId) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }
      const deleted = await this.deleteClientUseCase.execute(clientId);

      if (!deleted) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      // Invalida o cache para este cliente
      await this.redisClient.del(`client:${clientId}`);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}