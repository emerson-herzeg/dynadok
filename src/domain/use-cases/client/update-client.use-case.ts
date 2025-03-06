// src/domain/use-cases/client/update-client.use-case.ts
import { Client } from '../../entities/client-entity';
import { ClientRepository } from '../../repositories/ClientRepository';
import { ObjectId } from 'mongodb';

export class UpdateClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async execute(id: string, nome?: string, email?: string, telefone?: string): Promise<Client | null> {
    const updateData: Partial<Client> = {};
    if (nome) updateData.nome = nome;
    if (email) updateData.email = email;
    if (telefone) updateData.telefone = telefone;

    return this.clientRepository.update(new ObjectId(id), updateData);
  }
}