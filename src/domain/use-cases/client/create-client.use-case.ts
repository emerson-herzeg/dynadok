// src/domain/use-cases/client/create-client.use-case.ts
import { Client } from '../../entities/client-entity';
import { ClientRepository } from '../../repositories/ClientRepository';

export class CreateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(nome: string, email: string, telefone: string): Promise<Client> {
    const client = new Client(nome, email, telefone);
    return this.clientRepository.create(client);
  }
}