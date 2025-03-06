// src/infrastructure/database/mongodb/mongodb-connection.ts
import mongoose from 'mongoose';
import { env } from '../../config/env';

export class MongoDBConnection {
  static async connect(): Promise<void> {
    try {
      await mongoose.connect(env.mongodbUri);
      console.log('Conectado ao MongoDB');
    } catch (error) {
      console.error('Erro ao conectar ao MongoDB', error);
      process.exit(1); // Encerra a aplicação em caso de falha na conexão
    }
  }
}