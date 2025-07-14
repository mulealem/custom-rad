import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth(): Promise<string> {
    // wait for 4 minutes before returning OK
    const waitTime = 4 * 60 * 1000; // 4 minutes
    const startTime = Date.now();
    await new Promise((resolve) => setTimeout(resolve, waitTime));
    return 'OK';
  }
}
