"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteClientUseCase = void 0;
const mongoose_1 = require("mongoose");
class DeleteClientUseCase {
    constructor(clientRepository) {
        this.clientRepository = clientRepository;
    }
    async execute(id) {
        return this.clientRepository.delete(new mongoose_1.Types.ObjectId(id));
    }
}
exports.DeleteClientUseCase = DeleteClientUseCase;
