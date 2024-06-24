import { Controller, Get, Param } from '@nestjs/common';
import { ExtratoService } from './extrato.service';

@Controller('extrato')
export class ExtratoController {
  constructor(private readonly extratoService: ExtratoService) {}

  @Get(':id')
  getExtrato(
    @Param('id')
    id: string,
  ) {
    this.extratoService.getExtrato(id)
    return id
  }
}
