import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateUserDto } from './transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  makeTransaction(
    @Body()
    body: CreateUserDto,
  ) {
    return this.transactionService.makeTransaction(body);
  }

  @Delete(':id')
  deleteTransaction(
    @Param('id')
    id: string,
  ) {
    return this.transactionService.deletTransaction(id);
  }
}
