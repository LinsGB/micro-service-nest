import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  tipo: string;

  @ApiProperty()
  @IsNumber()
  valor: number;

  @ApiProperty()
  @IsNumber()
  saldoId: number;
}
