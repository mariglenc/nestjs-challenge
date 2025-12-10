// apps/gateway/src/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

function formatUptime(seconds: number): string {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs.toString().padStart(2, '0')}:${mins
    .toString()
    .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

@Controller()
export class AppController {
  @Get()
  @Throttle(2, 10)
  root() {
    return {
      uptime: formatUptime(process.uptime()),
      appName: 'nestjs challenge',
    };
  }
}
