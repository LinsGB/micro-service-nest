import { Controller, Get, Param, Post } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('saldo')
export class SaldoController {
  constructor(private readonly saldoService: SaldoService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Recupera o saldo' })
  getSaldo(
    @Param('id')
    id: string,
  ) {
    return this.saldoService.getSaldo(id);
  }

  @Post()
  @ApiOperation({ summary: 'Cria o saldo, no caso representa uma conta' })
  createSaldo() {
    return this.saldoService.createSaldo();
  }
}
