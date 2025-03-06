"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const create_client_use_case_1 = require("./create-client.use-case");
const client_entity_1 = require("../../entities/client-entity");
const globals_1 = require("@jest/globals");
// Mock (Simulação) do ClientRepository para isolar o teste do Use Case
const mockClientRepository = {
    create: globals_1.jest.fn(), // <--- Correctly typed mock for 'create'
    update: globals_1.jest.fn(), // <--- Correctly typed mock for 'update'
    findById: globals_1.jest.fn(), // <--- Correctly typed mock for 'findById'
    findAll: globals_1.jest.fn(), // <--- Correctly typed mock for 'findAll'
    delete: globals_1.jest.fn(), // <--- Correctly typed mock for 'delete'
    findByEmail: globals_1.jest.fn(), // <--- Correctly typed mock for 'findByEmail'
};
(0, globals_1.describe)('CreateClientUseCase', () => {
    (0, globals_1.it)('should create a new client', async () => {
        const createClientUseCase = new create_client_use_case_1.CreateClientUseCase(mockClientRepository);
        const clientData = {
            nome: 'Nome Cliente Teste',
            email: 'teste@email.com',
            telefone: '123456789',
        };
        const expectedClient = new client_entity_1.Client(clientData.nome, clientData.email, clientData.telefone);
        // Configura o mock para retornar o cliente esperado quando create for chamado
        mockClientRepository.create.mockResolvedValue(expectedClient); // <-- Explicit type assertion here
        const createdClient = await createClientUseCase.execute(clientData.nome, // Pass nome as the first argument
        clientData.email, // Pass email as the second argument
        clientData.telefone // Pass telefone as the third argument
        );
        (0, globals_1.expect)(createdClient).toEqual(expectedClient); // Verifica se o use case retorna o cliente correto
        (0, globals_1.expect)(mockClientRepository.create).toHaveBeenCalledWith(expectedClient); // Correct - expecting the Client entity // Verifica se o método create do repositório foi chamado corretamente
    });
});
