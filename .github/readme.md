# NestJS Technical Code Challenge

A NestJS monorepo backend demonstrating microservices architecture with TCP communication, user management, and Docker containerization.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)

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

## 📁 Project Structure

```
nestjs-challenge/
├── apps/
│   ├── gateway/                    # HTTP REST API
│   │   ├── src/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   └── dto/
│   │   │   │       └── create-user.dto.ts
│   │   │   ├── common/
│   │   │   │   ├── messaging/
│   │   │   │   │   └── patterns.ts
│   │   │   │   └── networking/
│   │   │   │       ├── networking.service.ts
│   │   │   │       └── networking.module.ts
│   │   │   ├── app.module.ts
│   │   │   └── main.ts
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── authentication/             # Microservice
│       ├── src/
│       │   ├── users/
│       │   │   ├── users.controller.ts
│       │   │   ├── users.service.ts
│       │   │   ├── users.repository.ts
│       │   │   ├── users.schema.ts
│       │   │   ├── users.module.ts
│       │   │   └── dto/
│       │   │       └── create-user.dto.ts
│       │   ├── common/
│       │   │   └── messaging/
│       │   │       └── patterns.ts
│       │   ├── app.module.ts
│       │   └── main.ts
│       ├── Dockerfile
│       └── package.json
│
├── docker-compose.yml
└── README.md
```

## 📦 Prerequisites

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Docker** >= 20.x
- **Docker Compose** >= 2.x

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd nestjs-challenge
```

### 2. Install Dependencies

```bash
# Install dependencies for Gateway
cd apps/gateway
npm install

# Install dependencies for Authentication
cd ../authentication
npm install
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

### Option 2: Running Locally

**Terminal 1 - MongoDB:**
```bash
docker run -d -p 27017:27017 --name mongo mongo:latest
```

**Terminal 2 - Authentication Service:**
```bash
cd apps/authentication
npm run build
npm run start:prod
# Or for development: npm run start:dev
```

**Terminal 3 - Gateway Service:**
```bash
cd apps/gateway
npm run build
npm run start:prod
# Or for development: npm run start:dev
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

### Using cURL

```bash
# Register a user
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'

# Get all users
curl http://localhost:3000/auth/users
```

### Postman Collection

Import the Postman collection from the project root for easy testing.

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

## ⚙️ Environment Variables

### Gateway Service

| Variable | Default | Description |
|----------|---------|-------------|
| `GATEWAY_PORT` | `3000` | HTTP server port |
| `AUTH_SERVICE_HOST` | `authentication` | Authentication service host |
| `AUTH_SERVICE_PORT` | `4001` | Authentication service port |
| `NODE_ENV` | `production` | Environment mode |

### Authentication Service

| Variable | Default | Description |
|----------|---------|-------------|
| `AUTH_SERVICE_HOST` | `0.0.0.0` | Microservice bind address |
| `AUTH_SERVICE_PORT` | `4001` | TCP microservice port |
| `MONGO_URI` | `mongodb://mongo:27017/nestjs-challenge` | MongoDB connection string |
| `NODE_ENV` | `production` | Environment mode |

### MongoDB

| Variable | Default | Description |
|----------|---------|-------------|
| `MONGO_INITDB_DATABASE` | `nestjs-challenge` | Initial database name |

## 🔧 Troubleshooting

### Port 27017 Already in Use

**Windows:**
```powershell
# Run as Administrator
net stop winnat
net start winnat
```

**Mac/Linux:**
```bash
# Find process using port
lsof -ti:27017

# Kill the process
kill -9 <PID>
```

**Alternative:** Change MongoDB port in `docker-compose.yml`:
```yaml
mongo:
  ports:
    - "27018:27017"  # Use external port 27018
```

### Microservice Connection Timeout

Ensure services start in correct order:
```bash
docker-compose down
docker-compose up mongo -d
sleep 5
docker-compose up authentication -d
sleep 5
docker-compose up gateway -d
```

### MongoDB Connection Failed

Check MongoDB is running:
```bash
docker ps | grep mongo
```

Test connection:
```bash
mongosh mongodb://localhost:27017/nestjs-challenge
```

### View Service Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f gateway
docker-compose logs -f authentication
docker-compose logs -f mongo
```

### Clear All Docker Data

```bash
docker-compose down -v
docker system prune -af
docker volume prune -f
```

## 🗄️ Database Access

### Connection String
```
mongodb://localhost:27017/nestjs-challenge
```

### Using MongoDB Compass
1. Download [MongoDB Compass](https://www.mongodb.com/products/compass)
2. Connect with: `mongodb://localhost:27017/nestjs-challenge`

### Using Mongo Shell
```bash
# Via Docker
docker exec -it nestjs_challenge_mongo mongosh nestjs-challenge

# Show all users
db.users.find().pretty()
```

## 🏗️ Design Patterns

### Controller → Service → Repository
- **Controllers**: Handle HTTP/TCP requests and responses
- **Services**: Business logic and orchestration
- **Repositories**: Data access layer (MongoDB operations)

### DTOs (Data Transfer Objects)
- Request validation using `class-validator`
- Type-safe data transfer between layers

### NetworkingService Abstraction
- Centralized microservice communication
- Error handling and timeout management
- Easier testing with dependency injection

## 📝 Key Features Implemented

- ✅ NestJS Monorepo Architecture
- ✅ Microservices with TCP Transport
- ✅ NetworkingService Abstraction Layer
- ✅ MongoDB with Mongoose ODM
- ✅ Request Validation (class-validator)
- ✅ Swagger/OpenAPI Documentation
- ✅ Docker & Docker Compose
- ✅ MVC Pattern (Controller → Service → Repository)
- ✅ DTOs for Request/Response
- ✅ Error Handling & Validation
- ✅ Environment Configuration

## 🎯 Future Enhancements

- [ ] JWT-based authentication
- [ ] Refresh token mechanism
- [ ] Rate limiting & throttling
- [ ] Redis caching layer
- [ ] Centralized logging (Winston/Pino)
- [ ] Health checks & readiness probes
- [ ] Unit & E2E test coverage
- [ ] CI/CD pipeline
- [ ] Kubernetes deployment configs

## 📄 License

This project is part of a technical challenge and is intended for evaluation purposes.

## 👤 Author

Created as part of NestJS Technical Code Challenge

---

**Happy Coding! 🚀**