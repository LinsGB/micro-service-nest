import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_SERVICE') private rabbitClient: ClientProxy,
  ) {}

  makeTransaction(payload: CreateUserDto) {
    this.rabbitClient.emit('make-transaction', payload);
    return { message: 'Ordem de transação enviada' };
  }

  cancelTransaction(id: string) {
    this.rabbitClient.emit('cancel-transaction', { id: +id });
    return { message: 'Ordem de cancelamento enviada' };
  }
}
