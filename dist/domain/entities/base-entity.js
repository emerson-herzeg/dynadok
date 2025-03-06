"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
// src/domain/entities/base-entity.ts
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = mongoose_1.default.Schema.Types.ObjectId; // DEFINE ObjectId HERE, within the file scope
class BaseEntity {
    constructor(id) {
        if (id) {
            this._id = new ObjectId(id); // Instantiate using the defined ObjectId
        }
        this.createdAt = this.createdAt || new Date();
        this.updatedAt = new Date();
    }
}
exports.BaseEntity = BaseEntity;
