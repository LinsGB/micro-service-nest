import { Controller, Get, Param } from '@nestjs/common';
import { ExtratoService } from './extrato.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('extrato')
export class ExtratoController {
  constructor(private readonly extratoService: ExtratoService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Recupera o extrato, histórico de transações' })
  getExtrato(
    @Param('id')
    id: string,
  ) {
    return this.extratoService.getExtrato(id);
  }
}
