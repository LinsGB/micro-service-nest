import { Module } from '@nestjs/common';
import { ExtratoModule } from './extrato/extrato.module';
import { SaldoModule } from './saldo/saldo.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [ExtratoModule, SaldoModule, TransactionModule],
})
export class AppModule {}
