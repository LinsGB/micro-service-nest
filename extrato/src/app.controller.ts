import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get-extrato' })
  getHello(@Payload() payload: { id: string }): string {
    console.log('EXTRATO: ', payload.id);
    return 'EXTRATO';
  }
}
