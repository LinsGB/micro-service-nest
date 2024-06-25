import { Controller, Get, Param, Post } from '@nestjs/common';
import { SaldoService } from './saldo.service';

@Controller('saldo')
export class SaldoController {
  constructor(private readonly saldoService: SaldoService) {}

  @Get(':id')
  getSaldo(
    @Param('id')
    id: string,
  ) {
    return this.saldoService.getSaldo(id);
  }

  @Post()
  createSaldo() {
    return this.saldoService.createSaldo();
  }
}
