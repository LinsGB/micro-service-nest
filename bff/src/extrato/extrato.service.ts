import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ExtratoService {
  constructor(@Inject('EXTRATO_SERVICE') private rabbitClient: ClientProxy) {}

  getExtrato(id: string) {
    this.rabbitClient.send('get-extrato', id)
  }
}
