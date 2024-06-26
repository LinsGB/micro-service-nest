import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

enum TransactionTypes {
  DEPOSITO = 'DEPOSITO',
  COMPRA = 'COMPRA',
  TRANSFERENCIA = 'TRANSFERENCIA',
  SAQUE = 'SAQUE',
}

export class TransactionDto {
  @ApiProperty({
    enum: TransactionTypes,
    example: "'DEPOSITO' | 'COMPRA' | 'TRANSFERENCIA' | 'SAQUE'",
  })
  @IsString()
  tipo: 'DEPOSITO' | 'COMPRA' | 'TRANSFERENCIA' | 'SAQUE';

  @ApiProperty()
  @IsString()
  valor: string;

  @ApiProperty()
  @IsNumber()
  saldoId: number;
}
