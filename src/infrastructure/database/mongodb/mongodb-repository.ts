// src/infrastructure/database/mongodb/mongodb-repository.ts
import mongoose, { Model, Types } from 'mongoose'; // Importe Types do mongoose
import { BaseRepository } from '../../../domain/repositories/BaseRepository';
import { BaseEntity } from '../../../domain/entities/base-entity';

export abstract class MongoDBRepository<T extends BaseEntity> implements BaseRepository<T> {
    private model: Model<T & mongoose.Document>;

    constructor(modelName: string, schema: mongoose.Schema<T & mongoose.Document>) {
        this.model = mongoose.model<T & mongoose.Document>(modelName, schema);
    }
    
    async findAll(): Promise<T[]> {
        const documents = await this.model.find().lean();
        return documents as T[];
    }

    async create(entity: T): Promise<T> {
        const createdDocument = await this.model.create(entity);
        return createdDocument.toObject() as T;
    }

    async update(id: Types.ObjectId, entity: Partial<T>): Promise<T | null> { // Use Types.ObjectId - CORRESPONDER à interface BaseRepository
        const updatedDocument = await this.model.findByIdAndUpdate(id, { ...entity, updatedAt: new Date() }, { new: true }).lean();
        return updatedDocument as T | null;
    }

    async findById(id: Types.ObjectId): Promise<T | null> { // Use Types.ObjectId - CORRESPONDER à interface BaseRepository
        const document = await this.model.findById(id).lean();
        return document as T | null;
    }
    
    async delete(id: Types.ObjectId): Promise<boolean> { // REMOVA o parâmetro 'entity: Partial<T>'
        const result = await this.model.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
}