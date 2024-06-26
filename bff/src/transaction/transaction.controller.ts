import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './transaction.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Faz uma transação' })
  makeTransaction(
    @Body()
    body: TransactionDto,
  ) {
    return this.transactionService.makeTransaction(body);
  }

  @Patch(':id/refund')
  @ApiOperation({ summary: 'Solicita reembolso' })
  refaund(
    @Param('id')
    id: string,
  ) {
    return this.transactionService.refaund(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma transação' })
  cancelTransaction(
    @Param('id')
    id: string,
  ) {
    return this.transactionService.cancelTransaction(id);
  }
}
