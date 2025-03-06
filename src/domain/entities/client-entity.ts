// src/domain/entities/Client.entity.ts
import { BaseEntity } from './base-entity';

export class Client extends BaseEntity {
    public nome: string;
    public email: string;
    public telefone: string;

    constructor(nome: string, email: string, telefone: string, id?: string) {
        super(id);
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
    }
}