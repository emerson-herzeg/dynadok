// src/infrastructure/server/server.ts
import express, { Express } from 'express';
import clientRoutes from '../routes/client.routes';
import { MongoDBConnection } from '../database/mongodb/mongodb-connection';

export class Server {
  private app: Express;
  private port: number;

  constructor(port = 3000) {
    this.app = express();
    this.port = port;
    this.setupMiddleware();
    this.setupRoutes();
  }

  private setupMiddleware(): void {
    this.app.use(express.json());
    // Outros middlewares podem ser adicionados aqui (cors, etc.)
  }

  private setupRoutes(): void {
    this.app.use('/clients', clientRoutes);
    // Outras rotas podem ser adicionadas aqui
  }

  async start(): Promise<void> {
    await MongoDBConnection.connect(); // Conecta ao MongoDB ao iniciar o servidor
    this.app.listen(this.port, () => {
      console.log(`Servidor rodando na porta ${this.port}`);
    });
  }

  getApp(): Express {
    return this.app; // Útil para testes de integração
  }
}