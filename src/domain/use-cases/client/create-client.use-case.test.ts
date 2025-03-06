// src/domain/use-cases/client/create-client.use-case.test.ts
import mongoose from 'mongoose';
import { CreateClientUseCase } from './create-client.use-case';
import { ClientRepository } from '../../repositories/ClientRepository';
import { Client } from '../../entities/client-entity';
import { describe, expect, it, jest } from '@jest/globals';

// Mock (Simulação) do ClientRepository para isolar o teste do Use Case
const mockClientRepository: ClientRepository = {
    create: jest.fn< (entity: Client) => Promise<Client> >(), // <--- Correctly typed mock for 'create'
    update: jest.fn< (id: mongoose.Types.ObjectId, entity: Partial<Client>) => Promise<Client | null> >(), // <--- Correctly typed mock for 'update'
    findById: jest.fn< (id: mongoose.Types.ObjectId) => Promise<Client | null> >(), // <--- Correctly typed mock for 'findById'
    findAll: jest.fn< () => Promise<Client[]> >(), // <--- Correctly typed mock for 'findAll'
    delete: jest.fn< (id: mongoose.Types.ObjectId) => Promise<boolean> >(), // <--- Correctly typed mock for 'delete'
    findByEmail: jest.fn< (email: string) => Promise<Client | null> >(), // <--- Correctly typed mock for 'findByEmail'
};

describe('CreateClientUseCase', () => {
    it('should create a new client', async () => {
        const createClientUseCase = new CreateClientUseCase(mockClientRepository);
        const clientData = {
            nome: 'Nome Cliente Teste',
            email: 'teste@email.com',
            telefone: '123456789',
        };
        const expectedClient = new Client(clientData.nome, clientData.email, clientData.telefone);

        // Configura o mock para retornar o cliente esperado quando create for chamado
        (mockClientRepository.create as jest.Mock<(entity: Client) => Promise<Client>>).mockResolvedValue(expectedClient); // <-- Explicit type assertion here

        const createdClient = await createClientUseCase.execute(
            clientData.nome, // Pass nome as the first argument
            clientData.email, // Pass email as the second argument
            clientData.telefone  // Pass telefone as the third argument
        );

        expect(createdClient).toEqual(expectedClient); // Verifica se o use case retorna o cliente correto
        expect(mockClientRepository.create).toHaveBeenCalledWith(expectedClient); // Correct - expecting the Client entity // Verifica se o método create do repositório foi chamado corretamente
    });
});