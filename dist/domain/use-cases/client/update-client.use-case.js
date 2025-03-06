"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientUseCase = void 0;
const mongodb_1 = require("mongodb");
class UpdateClientUseCase {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(id, nome, email, telefone) {
        const updateData = {};
        if (nome)
            updateData.nome = nome;
        if (email)
            updateData.email = email;
        if (telefone)
            updateData.telefone = telefone;
        return this.clientRepository.update(new mongodb_1.ObjectId(id), updateData);
    }
}
exports.UpdateClientUseCase = UpdateClientUseCase;
