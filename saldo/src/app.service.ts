import { Injectable } from '@nestjs/common';
import { PrismaConectorService } from './prisma-conector/prisma-conector.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaConectorService) {}

  async getSaldo(id: number) {
    return await this.prisma.saldo.findUnique({
      where: {
        id,
      },
    });
  }

  async makeTransaction(
    data: {
      tipo: string;
      valor: string;
      saldoId: number;
    },
    recursivity?: boolean,
  ) {
    await this.prisma.$transaction(async (prisma) => {
      const saldo = await prisma.saldo.findUnique({
        where: { id: data.saldoId },
      });
      const newValue =
        data.tipo === 'DEPOSITO'
          ? +saldo.valor + +data.valor
          : +saldo.valor - +data.valor;

      await prisma.saldo
        .update({
          data: {
            valor: newValue.toString(),
            vercao: saldo.vercao + 1,
          },
          where: {
            id: data.saldoId,
            vercao: saldo.vercao,
          },
        })
        .catch(() => {
          console.warn(
            'Versão alterada no processo, refazendo o fluxo (Lock Optimista)',
          );
          this.makeTransaction(data, true);
        });

      if (!recursivity) {
        await prisma.transacoes.create({
          data: {
            tipo: data.tipo,
            valor: data.valor.toString(),
            saldoId: data.saldoId,
            status: 'EXECUTADA',
          },
        });
      }

      return;
    });
  }

  async deleteTransaction(
    id: number,
    recursiviDeletedTransaction?: {
      id: number;
      tipo: string;
      valor: string;
      saldoId: number;
    },
  ) {
    await this.prisma.$transaction(async (prisma) => {
      let deletedTransaction: {
        id: number;
        tipo: string;
        valor: string;
        saldoId: number;
      } = recursiviDeletedTransaction;
      if (!recursiviDeletedTransaction) {
        deletedTransaction = await prisma.transacoes.delete({
          where: {
            id,
          },
        });
      }
      const saldo = await prisma.saldo.findUnique({
        where: {
          id: deletedTransaction.saldoId,
        },
      });
      const newValue =
        deletedTransaction.tipo === 'DEPOSITO'
          ? +saldo.valor - +deletedTransaction.valor
          : +saldo.valor + +deletedTransaction.valor;
      await prisma.saldo
        .update({
          data: {
            valor: newValue.toString(),
            vercao: saldo.vercao + 1,
          },
          where: {
            id: saldo.id,
            vercao: saldo.vercao,
          },
        })
        .catch(async () => {
          console.warn(
            'Versão alterada no processo, refazendo o fluxo (Lock Optimista)',
          );
          await this.deleteTransaction(id, deletedTransaction);
        });
    });
  }

  async refundTransaction(
    id: number,
    recursiviDeletedTransaction?: {
      id: number;
      tipo: string;
      valor: string;
      saldoId: number;
    },
  ) {
    await this.prisma.$transaction(async (prisma) => {
      let updatedTransaction: {
        id: number;
        tipo: string;
        valor: string;
        saldoId: number;
      } = recursiviDeletedTransaction;

      if (!recursiviDeletedTransaction) {
        try {
          updatedTransaction = await prisma.transacoes.update({
            where: {
              id,
              OR: [
                {
                  tipo: 'TRANSFERENCIA',
                },
                {
                  tipo: 'COMPRA',
                },
              ],
            },
            data: {
              status: 'REMBOLSADO',
            },
          });
        } catch (error) {
          console.error(error);
          return;
        }
      }

      const saldo = await prisma.saldo.findUnique({
        where: {
          id: updatedTransaction.saldoId,
        },
      });
      const newValue = +saldo.valor + +updatedTransaction.valor;
      await prisma.saldo
        .update({
          data: {
            valor: newValue.toString(),
            vercao: saldo.vercao + 1,
          },
          where: {
            id: saldo.id,
            vercao: saldo.vercao,
          },
        })
        .catch(async () => {
          console.warn(
            'Versão alterada no processo, refazendo o fluxo (Lock Optimista)',
          );
          await this.deleteTransaction(id, updatedTransaction);
        });
    });
  }

  async createSaldo() {
    await this.prisma.saldo.create({
      data: {
        valor: '0',
        vercao: 0,
      },
    });
  }
}
