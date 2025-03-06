// src/domain/entities/base-entity.ts
import mongoose from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId; // DEFINE ObjectId HERE, within the file scope

export abstract class BaseEntity {
    public _id?: mongoose.Schema.Types.ObjectId; // Use mongoose.Schema.Types.ObjectId directly in type

    public createdAt?: Date;
    public updatedAt?: Date;

    constructor(id?: string) {
        if (id) {
            this._id = new ObjectId(id); // Instantiate using the defined ObjectId
        }
        this.createdAt = this.createdAt || new Date();
        this.updatedAt = new Date();
    }
}