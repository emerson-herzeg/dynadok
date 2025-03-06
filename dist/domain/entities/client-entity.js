"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
// src/domain/entities/Client.entity.ts
const base_entity_1 = require("./base-entity");
class Client extends base_entity_1.BaseEntity {
    constructor(nome, email, telefone, id) {
        super(id);
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
}
exports.Client = Client;
