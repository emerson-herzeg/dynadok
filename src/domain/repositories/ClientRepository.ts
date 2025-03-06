// src/domain/repositories/client.repository.ts
import { BaseRepository } from './BaseRepository';
import { Client } from '../entities/client-entity';
import { Types } from 'mongoose'; // Import Types for ObjectId

export interface ClientRepository extends BaseRepository<Client> {
    findByEmail(email: string): Promise<Client | null>;
}