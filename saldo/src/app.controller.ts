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
    @Payload() payload: { tipo: string; valor: string; saldoId: number },
  ) {
    console.log('EVENT: make-transaction');
    this.appService.makeTransaction(payload);
  }

  @EventPattern('create-saldo')
  createSaldo() {
    console.log('EVENT: create-saldo');
    this.appService.createSaldo();
  }

  @EventPattern('delete-transaction')
  deleteTransaction(@Payload() payload: { id: number }) {
    console.log('EVENT: delete-transaction');
    this.appService.deleteTransaction(payload.id);
  }

  @EventPattern('refund-transaction')
  refundTransaction(@Payload() payload: { id: number }) {
    console.log('EVENT: refund-transaction');
    this.appService.refundTransaction(payload.id);
  }
}
