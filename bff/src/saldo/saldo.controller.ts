import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Patch(':id')
  updateSaldo(
    @Param('id')
    id: string,
  ) {
    return this.saldoService.updateSaldo(id);
  }

  @Post(':id')
  createSaldo(
    @Param('id')
    id: string,
  ) {
    return this.saldoService.createSaldo(id);
  }

  @Delete(':id')
  cdeleteSaldo(
    @Param('id')
    id: string,
  ) {
    return this.saldoService.deleteSaldo(id);
  }
}
