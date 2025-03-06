// src/domain/use-cases/client/list-clients.use-case.ts
import { Client } from '../../entities/client-entity';
import { ClientRepository } from '../../repositories/ClientRepository';

export class ListClientsUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(): Promise<Client[]> {
    return this.clientRepository.findAll();
  }
}