import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';
// import { Throttle } from '@nestjs/throttler';

@Controller("health")
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator
  ) {}

  @Get()
  @HealthCheck()
//   @Throttle(10, 30) 
  check() {
    return this.health.check([
      async () => this.http.pingCheck("root", "http://localhost:3000/"),
      async () => this.http.pingCheck("users", "http://localhost:3000/auth/users"),
    ]);
  }
}
