import { Injectable } from '@nestjs/common';
import { Transacoes } from '@prisma/client';
import { PrismaConectorService } from './prisma-conector/prisma-conector.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaConectorService) {}

  async getTransactions(saldoId: string): Promise<Transacoes[]> {
    return this.prisma.transacoes.findMany({
      where: {
        saldoId: +saldoId,
      },
    });
  }
}
