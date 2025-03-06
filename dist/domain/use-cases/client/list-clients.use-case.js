"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListClientsUseCase = void 0;
class ListClientsUseCase {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute() {
        return this.clientRepository.findAll();
    }
}
exports.ListClientsUseCase = ListClientsUseCase;
