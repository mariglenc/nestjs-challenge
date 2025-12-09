<!-- Purpose: concise guidance for AI coding agents working on this NestJS monorepo -->
# Copilot instructions — NestJS Monorepo (apps/gateway + apps/authentication)

This file tells AI coding agents how this repository is organized and what conventions to follow so contributions stay consistent and immediately useful.

## Big picture
- Monorepo layout (required): `apps/gateway`, `apps/authentication`, `common`, `core`, `config`.
- `apps/gateway` — only HTTP surface (controllers, request validation, DTOs, Swagger). Forward all business operations to the authentication microservice over TCP.
- `apps/authentication` — business logic and persistence (services, repositories, Mongoose schemas). Exposes microservice handlers (TCP) consumed by the gateway.
- Communication: internal NestJS microservices over TCP. A `NetworkingService` (or similar ClientProxy wrapper) is used to centralize message patterns and connection options.

... (truncated for brevity: full content added by assistant earlier)
