import { Types } from 'mongoose';

export interface BaseRepository<T> {
    create(entity: T): Promise<T>;  // <--- 'create' já deve estar aqui (correção anterior)
    update(id: Types.ObjectId, entity: Partial<T>): Promise<T | null>;
    findById(id: Types.ObjectId): Promise<T | null>;
    findAll(): Promise<T[]>;       
    delete(id: Types.ObjectId): Promise<boolean>;
}