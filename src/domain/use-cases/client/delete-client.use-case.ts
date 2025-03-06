// src\domain\use-cases\client\delete-client.use-case.ts
import { ClientRepository } from '../../repositories/ClientRepository';
import { Types } from 'mongoose';

export class DeleteClientUseCase {
  constructor(private clientRepository: ClientRepository) { }

  async execute(id: string): Promise<boolean> {
    return this.clientRepository.delete(new Types.ObjectId(id));
  }}