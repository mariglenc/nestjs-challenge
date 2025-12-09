// apps\authentication\src\main.ts
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
      host: process.env.AUTH_SERVICE_HOST || '0.0.0.0',
      port: Number(process.env.AUTH_SERVICE_PORT || 4001),
    },
  });

  await app.listen();
  console.log(`Authentication microservice running on TCP port ${process.env.AUTH_SERVICE_PORT || 4001}`);
}

bootstrap();
