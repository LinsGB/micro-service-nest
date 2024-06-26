import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TransactionDto } from './transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_SERVICE') private rabbitClient: ClientProxy,
  ) {}

  makeTransaction(payload: TransactionDto) {
    this.rabbitClient.emit('make-transaction', payload);
    return { message: 'Ordem de transação enviada' };
  }

  cancelTransaction(id: string) {
    this.rabbitClient.emit('delete-transaction', { id: +id });
    return { message: 'Ordem de cancelamento enviada' };
  }

  refaund(id: string) {
    this.rabbitClient.emit('refund-transaction', { id: +id });
    return { message: 'Ordem de reembolso enviada' };
  }
}
