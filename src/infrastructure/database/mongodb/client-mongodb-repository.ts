// src/infrastructure/database/mongodb/client-mongodb-repository.ts
import { MongoDBRepository } from './mongodb-repository';
import { ClientRepository } from '../../../domain/repositories/ClientRepository';
import { Client } from '../../../domain/entities/client-entity';
import mongoose, { Schema } from 'mongoose';

const clientSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telefone: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

class ClientMongoDBRepository extends MongoDBRepository<Client> implements ClientRepository {
    constructor() {
        super('Client', clientSchema);
    }

    async findByEmail(email: string): Promise<Client | null> {
        const document = await mongoose.model('Client', clientSchema).findOne({ email }).lean();
        return document as Client | null;
    }
}

export const clientMongoDBRepository = new ClientMongoDBRepository();