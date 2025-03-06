// src/infrastructure/routes/client.routes.ts
import express from 'express';
import { ClientController } from '../../application/controllers/client.controller';
import { CreateClientUseCase } from '../../domain/use-cases/client/create-client.use-case';
import { GetClientByIdUseCase } from '../../domain/use-cases/client/get-client-by-id.use-case';
import { ListClientsUseCase } from '../../domain/use-cases/client/list-clients.use-case';
import { UpdateClientUseCase } from '../../domain/use-cases/client/update-client.use-case';
import { DeleteClientUseCase } from '../../domain/use-cases/client/delete-client.use-case';
import { clientMongoDBRepository } from '../database/mongodb/client-mongodb-repository';

const router = express.Router();

const clientController = new ClientController(
  new CreateClientUseCase(clientMongoDBRepository),
  new GetClientByIdUseCase(clientMongoDBRepository),
  new ListClientsUseCase(clientMongoDBRepository),
  new UpdateClientUseCase(clientMongoDBRepository),
  new DeleteClientUseCase(clientMongoDBRepository) 
);

router.post('/', (req, res) => clientController.create(req, res));
router.get('/:id', (req, res) => clientController.getById(req, res));
router.get('/', (req, res) => clientController.list(req, res));
router.put('/:id', (req, res) => clientController.update(req, res));
router.delete('/:id', (req, res) => clientController.delete(req, res));

export default router;