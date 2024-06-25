import { Injectable } from '@nestjs/common';
import { PrismaConectorService } from './prisma-conector/prisma-conector.service';
import { Transacoes, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaConectorService) {}

  async getTransactions(params: {
    where?: Prisma.TransacoesWhereInput;
  }): Promise<Transacoes[]> {
    const { where } = params;
    return this.prisma.transacoes.findMany({
      where,
    });
  }
}
