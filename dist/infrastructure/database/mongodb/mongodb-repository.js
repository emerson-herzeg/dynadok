"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBRepository = void 0;
// src/infrastructure/database/mongodb/mongodb-repository.ts
const mongoose_1 = __importDefault(require("mongoose")); // Importe Types do mongoose
class MongoDBRepository {
    constructor(modelName, schema) {
        this.model = mongoose_1.default.model(modelName, schema);
    }
    async findAll() {
        const documents = await this.model.find().lean();
        return documents;
    }
    async create(entity) {
        const createdDocument = await this.model.create(entity);
        return createdDocument.toObject();
    }
    async update(id, entity) {
        const updatedDocument = await this.model.findByIdAndUpdate(id, { ...entity, updatedAt: new Date() }, { new: true }).lean();
        return updatedDocument;
    }
    async findById(id) {
        const document = await this.model.findById(id).lean();
        return document;
    }
    async delete(id) {
        const result = await this.model.deleteOne({ _id: id });
        return result.deletedCount > 0;
    }
}
exports.MongoDBRepository = MongoDBRepository;
