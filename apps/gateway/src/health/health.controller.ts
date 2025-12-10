//apps\gateway\src\health\health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      async () => this.http.pingCheck("root", "http://localhost:3000/"),
      async () => this.http.pingCheck("users", "http://localhost:3000/auth/users"),
    ]);
  }
}
