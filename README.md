# Client Service API

## Descrição
API REST para cadastro e consulta de clientes, seguindo Clean Architecture e utilizando Node.js, Express.js, MongoDB, Redis e Kafka.

## Como rodar a aplicação

1. **Pré-requisitos:**
    - Docker e Docker Compose instalados.

2. **Iniciar os serviços com Docker Compose:**
    ```bash
   docker-compose up -d
    ```

3. **Instalar as dependências do projeto:**
    ```bash
    yarn install
    ```

4. **Rodar a aplicação (em desenvolvimento):**
    ```bash
    yarn dev
    ```

    Ou, para rodar a aplicação em modo de produção (após buildar):

    ```bash
    yarn start:prod
    ```

5. **Como rodar os testes unitários:**
   ```bash
    yarn test
    ```

6. **Endpoints da API:**    
    * POST /clients: Cadastra um novo cliente.
    ```bash
    {
        "nome": "Nome do Cliente",
        "email": "[endereço de e-mail removido]",
        "telefone": "123456789"
    }
    ```

    * GET /clients/:id: Consulta detalhes de um cliente por ID.

    * GET /clients: Lista todos os clientes.

    * PUT /clients/:id: Atualiza dados de um cliente.
    ```bash
    {
        "nome": "Novo Nome",
        "telefone": "987654321"
    }
    ```