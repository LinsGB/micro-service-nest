import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class TransactionDto {
  @ApiProperty()
  @IsString()
  tipo: string;

  @ApiProperty()
  @IsString()
  valor: string;

  @ApiProperty()
  @IsNumber()
  saldoId: number;
}
