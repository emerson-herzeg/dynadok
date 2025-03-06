"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
// import { ClientRepository } from '../../domain/repositories/ClientRepository';
const redis_client_1 = require("../../infrastructure/redis/redis-client");
const kafka_producer_1 = require("../../infrastructure/message-broker/kafka/kafka-producer");
class ClientController {
    constructor(createClientUseCase, getClientByIdUseCase, listClientsUseCase, updateClientUseCase, deleteClientUseCase) {
        this.createClientUseCase = createClientUseCase;
        this.getClientByIdUseCase = getClientByIdUseCase;
        this.listClientsUseCase = listClientsUseCase;
        this.updateClientUseCase = updateClientUseCase;
        this.deleteClientUseCase = deleteClientUseCase;
        this.redisClient = new redis_client_1.RedisClient();
        this.kafkaProducer = new kafka_producer_1.KafkaProducer();
    }
    async create(req, res) {
        try {
            const { nome, email, telefone } = req.body;
            const client = await this.createClientUseCase.execute(nome, email, telefone);
            // Publicar mensagem no Kafka (simples log)
            this.kafkaProducer.produce('client-events', `Cliente ${client.nome} (ID: ${client._id}) cadastrado.`);
            return res.status(201).json(client);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async getById(req, res) {
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
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async list(_req, res) {
        try {
            const clients = await this.listClientsUseCase.execute();
            return res.status(200).json(clients);
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async update(req, res) {
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
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    async delete(req, res) {
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
        }
        catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}
exports.ClientController = ClientController;
