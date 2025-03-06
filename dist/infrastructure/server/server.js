"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
// src/infrastructure/server/server.ts
const express_1 = __importDefault(require("express"));
const client_routes_1 = __importDefault(require("../routes/client.routes"));
const mongodb_connection_1 = require("../database/mongodb/mongodb-connection");
class Server {
    constructor(port = 3000) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.setupMiddleware();
        this.setupRoutes();
    }
    setupMiddleware() {
        this.app.use(express_1.default.json());
        // Outros middlewares podem ser adicionados aqui (cors, etc.)
    }
    setupRoutes() {
        this.app.use('/clients', client_routes_1.default);
        // Outras rotas podem ser adicionadas aqui
    }
    async start() {
        await mongodb_connection_1.MongoDBConnection.connect(); // Conecta ao MongoDB ao iniciar o servidor
        this.app.listen(this.port, () => {
            console.log(`Servidor rodando na porta ${this.port}`);
        });
    }
    getApp() {
        return this.app; // Útil para testes de integração
    }
}
exports.Server = Server;
