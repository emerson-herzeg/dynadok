"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClientUseCase = void 0;
// src/domain/use-cases/client/create-client.use-case.ts
const client_entity_1 = require("../../entities/client-entity");
class CreateClientUseCase {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(nome, email, telefone) {
        const client = new client_entity_1.Client(nome, email, telefone);
        return this.clientRepository.create(client);
    }
}
exports.CreateClientUseCase = CreateClientUseCase;
