import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  makeTransaction(
    @Body()
    body: TransactionDto,
  ) {
    console.log('body', body)
    return this.transactionService.makeTransaction(body);
  }

  @Delete(':id')
  cancelTransaction(
    @Param('id')
    id: string,
  ) {
    return this.transactionService.cancelTransaction(id);
  }
}
