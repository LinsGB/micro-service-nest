import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExtratoModule } from './extrato/extrato.module';
import { SaldoModule } from './saldo/saldo.module';

@Module({
  imports: [ExtratoModule, SaldoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
