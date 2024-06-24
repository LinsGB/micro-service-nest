import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SaldoService {
  constructor(@Inject('SALDO_SERVICE') private rabbitClient: ClientProxy) {}

  async getSaldo(id: string) {
    const result = this.rabbitClient.send({ cmd: 'get-saldo' }, { id });
    return await lastValueFrom(result);
  }

  updateSaldo(id: string) {
    this.rabbitClient.emit('update-saldo', { id });
    return { message: 'Saldo Atualizado' };
  }

  async createSaldo(id: string) {
    this.rabbitClient.emit('create-saldo', { id });
    return { message: 'Saldo Criado' };
  }

  async deleteSaldo(id: string) {
    this.rabbitClient.emit('delete-saldo', { id });
    return { message: 'Saldo Deletado' };
  }
}
