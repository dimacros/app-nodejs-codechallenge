# Yape Code Challenge 🚀

Welcome to the **Yape Code Challenge**! This project is designed to showcase your skills in building scalable, maintainable, and efficient backend systems. The challenge involves implementing a robust microservices architecture using modern tools and frameworks, with a focus on clean code, modular design, and seamless communication between services.

## Key Features

- **Microservices Architecture**: Leverage NestJS to build modular and scalable services.
- **Event-Driven Communication**: Use Kafka for asynchronous messaging between services.
- **Database Integration**: Design and implement a relational database schema using Prisma.
- **Clean Code Practices**: Follow industry standards for maintainable and testable code.
- **Task Automation**: Utilize TurboRepo for efficient task management and dependency handling.

## Objectives

1. Implement a **Gateway** service to handle API requests and route commands/queries to the appropriate processors.
2. Build a **Processor** service to handle business logic, process commands, and respond to queries.
3. Ensure seamless communication between services using Kafka as the messaging backbone.
4. Design a relational database schema to store and manage transactional data.
5. Write unit and integration tests to ensure the reliability of the system.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient and scalable server-side applications.
- **Kafka**: A distributed event streaming platform for asynchronous communication.
- **Prisma**: A modern ORM for database management and schema design.
- **TurboRepo**: A high-performance build system for managing monorepos.
- **TypeScript**: A strongly typed programming language for building robust applications.

## Getting Started

Getting started is simple and hassle-free! Follow these steps to spin up the entire system with a single command:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/yape-code-challenge.git
   cd yape-code-challenge

This challenge is an excellent opportunity to demonstrate your expertise in backend development, microservices, and event-driven architectures. Good luck, and happy coding! 🚀

2. **Run the Services with Docker Compose**: Ensure you have Docker and Docker Compose installed, then run:
   ```bash
   docker-compose up --build

    AND

  ```bash
   docker compose up -d
   pnpm install & pnpm dev

That's it! With a single command, your environment is ready to go. Dive into the code, explore the architecture, and start building something amazing.

## Try the endpoints

### 1. Create a Transaction

Endpoint: `POST /v1/transactions`

Description: Creates a new transaction.

Request Body:
  ```json
    {
      "transactionExternalId": "string",
      "accountExternalIdDebit": "string",
      "accountExternalIdCredit": "string",
      "transactionType": {
        "id": "string"
      },
      "value": 100.50
    }'
  ```

#### cURL Command:

  ```bash
    curl -X POST http://localhost:3000/v1/transactions \
    -H "Content-Type: application/json" \
    -d '{
      "transactionExternalId": "12345",
      "accountExternalIdDebit": "debit-account-id",
      "accountExternalIdCredit": "credit-account-id",
      "transactionType": {
        "id": "1"
      },
      "value": 100.50
    }'
  ```

### 2. Get All Transactions

Description: Retrieves all transactions based on query parameters.
  ```bash
    curl -X GET "http://localhost:3000/v1/transactions?page=1&limit=10"
  ```

### 3. Get Transaction by ID

Endpoint: `GET /v1/transactions/:transactionExternalI`

**Description** Retrieves a transaction by its external ID.

**cURL Command:**

  ```bash
    curl -X GET http://localhost:3000/v1/transactions/12345
  ```