import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ExtratoService {
  constructor(@Inject('EXTRATO_SERVICE') private rabbitClient: ClientProxy) {}

  async getExtrato(id: string) {
    const result = this.rabbitClient.send({ cmd: 'get-extrato' }, { id: +id });
    return await lastValueFrom(result);
  }
}
