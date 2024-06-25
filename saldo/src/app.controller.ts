import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @MessagePattern({ cmd: 'get-saldo' })
  async getSaldo(@Payload() payload: { id: number }) {
    return await this.appService.getSaldo(payload.id);
  }

  @EventPattern('make-transaction')
  makeTransaction(
    @Payload() payload: { tipo: string; valor: number; saldoId: number },
  ) {
    console.log('EVENT: make-transaction');
    this.appService.makeTransaction(payload);
  }

  @EventPattern('create-saldo')
  createSaldo() {
    console.log('EVENT: create-saldo');
    this.appService.createSaldo();
  }

  @EventPattern('cancel-transaction')
  deleteTransaction(@Payload() payload: { id: number }) {
    console.log('EVENT: cancel-transaction');
    this.appService.deleteTransaction(payload.id);
  }
}
