# NestJS Technical Code Challenge

A NestJS monorepo backend demonstrating microservices architecture with TCP communication, user management, and Docker containerization.

## 🎯 Overview

This project implements a microservices-based authentication system using NestJS. It consists of:

- **Gateway Service**: Public-facing HTTP REST API
- **Authentication Service**: Internal microservice for user management
- **MongoDB**: Database for user persistence

Services communicate internally via **TCP** using NestJS Microservices and a custom **NetworkingService** abstraction layer.

## 🏗️ Architecture

```
┌─────────────┐         TCP          ┌──────────────────┐
│   Gateway   │ ◄─────────────────► │  Authentication  │
│   (HTTP)    │                      │   (Microservice) │
│  Port 3000  │                      │    Port 4001     │
└─────────────┘                      └──────────────────┘
                                              │
                                              ▼
                                      ┌──────────────┐
                                      │   MongoDB    │
                                      │  Port 27017  │
                                      └──────────────┘
```

### Communication Flow

1. Client sends HTTP request to Gateway (`:3000`)
2. Gateway forwards request via TCP to Authentication service (`:4001`)
3. Authentication service processes business logic and interacts with MongoDB
4. Response flows back through the chain

## 🛠️ Tech Stack

- **Framework**: NestJS 10.x
- **Language**: TypeScript 5.x
- **Database**: MongoDB with Mongoose
- **Microservices**: @nestjs/microservices (TCP Transport)
- **Validation**: class-validator, class-transformer
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker & Docker Compose
- **Node.js**: 18.x (Alpine)

## 📦 Prerequisites
- **Docker** >= 20.x
- **Docker Compose** >= 2.x

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone git@github.com:mariglenc/nestjs-challenge.git
cd nestjs-challenge
```
## 🏃 Running the Application

### Option 1: Using Docker (Recommended)

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## 📖 API Documentation

### Swagger UI

Once the application is running, access the interactive API documentation:

```
http://localhost:3000/docs
```

### Available Endpoints

#### **POST /auth/register**
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"  // optional
}
```

**Response (201):**
```json
{
  "id": "675703a8f1234567890abcde",
  "email": "user@example.com",
  "name": "John Doe",
  "createdAt": "2025-12-09T17:30:00.000Z",
  "updatedAt": "2025-12-09T17:30:00.000Z"
}
```

**Error (409 - Email already exists):**
```json
{
  "statusCode": 409,
  "message": "Email already in use",
  "error": "Conflict"
}
```

#### **GET /auth/users**
Retrieve all registered users.

**Response (200):**
```json
[
  {
    "id": "675703a8f1234567890abcde",
    "email": "user@example.com",
    "name": "John Doe"
  }
]
```

## 🧪 Testing

### Unit Tests

```bash
# Gateway tests
cd apps/gateway
npm run test

# Authentication tests
cd apps/authentication
npm run test
```

### E2E Tests

```bash
# Gateway E2E
cd apps/gateway
npm run test:e2e

# Authentication E2E
cd apps/authentication
npm run test:e2e
```

### Test Coverage

```bash
npm run test:cov
```