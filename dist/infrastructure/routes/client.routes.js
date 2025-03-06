"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/infrastructure/routes/client.routes.ts
const express_1 = __importDefault(require("express"));
const client_controller_1 = require("../../application/controllers/client.controller");
const create_client_use_case_1 = require("../../domain/use-cases/client/create-client.use-case");
const get_client_by_id_use_case_1 = require("../../domain/use-cases/client/get-client-by-id.use-case");
const list_clients_use_case_1 = require("../../domain/use-cases/client/list-clients.use-case");
const update_client_use_case_1 = require("../../domain/use-cases/client/update-client.use-case");
const delete_client_use_case_1 = require("../../domain/use-cases/client/delete-client.use-case");
const client_mongodb_repository_1 = require("../database/mongodb/client-mongodb-repository");
const router = express_1.default.Router();
const clientController = new client_controller_1.ClientController(new create_client_use_case_1.CreateClientUseCase(client_mongodb_repository_1.clientMongoDBRepository), new get_client_by_id_use_case_1.GetClientByIdUseCase(client_mongodb_repository_1.clientMongoDBRepository), new list_clients_use_case_1.ListClientsUseCase(client_mongodb_repository_1.clientMongoDBRepository), new update_client_use_case_1.UpdateClientUseCase(client_mongodb_repository_1.clientMongoDBRepository), new delete_client_use_case_1.DeleteClientUseCase(client_mongodb_repository_1.clientMongoDBRepository));
router.post('/', (req, res) => clientController.create(req, res));
router.get('/:id', (req, res) => clientController.getById(req, res));
router.get('/', (req, res) => clientController.list(req, res));
router.put('/:id', (req, res) => clientController.update(req, res));
router.delete('/:id', (req, res) => clientController.delete(req, res));
exports.default = router;
