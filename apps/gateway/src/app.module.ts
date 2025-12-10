//apps\gateway\src\app.module.ts
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { HealthModule } from './health/health.module';

import { AuthController } from './auth/auth.controller';
import { AppController } from './app.controller'; // <- import

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: 60, // time window in seconds
      limit: 5, // max 5 requests per TTL per IP
      ignoreUserAgents: [], // optional
      errorMessage: 'Too many requests', // optional
    } as any ),
    HealthModule,
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.AUTH_SERVICE_HOST || '127.0.0.1',
          port: Number(process.env.AUTH_SERVICE_PORT || 4001),
        },
      },
    ]),
  ],
  controllers: [AuthController, AppController],
})
export class AppModule {}
