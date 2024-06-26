import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SaldoService {
  constructor(@Inject('SALDO_SERVICE') private rabbitClient: ClientProxy) {}

  async getSaldo(id: string) {
    const result = this.rabbitClient.send({ cmd: 'get-saldo' }, { id: +id });
    return await lastValueFrom(result);
  }

  async createSaldo() {
    this.rabbitClient.emit('create-saldo', {});
    return { message: 'Ordem de criação de saldo enviada' };
  }
}
