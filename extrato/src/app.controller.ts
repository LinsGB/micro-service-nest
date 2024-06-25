import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get-extrato' })
  async getTransactions(@Payload() payload: { id: string }) {
    return await this.appService.getTransactions(payload.id);
  }
}
