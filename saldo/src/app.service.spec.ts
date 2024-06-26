import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { PrismaConectorService } from './prisma-conector/prisma-conector.service';

class MockPrismaConectorService {
  $transaction = jest.fn((calback) => Promise.resolve(calback(this)));
  saldo = {
    findUnique: jest.fn(),
    update: jest.fn(() => Promise.resolve()),
    create: jest.fn(() => Promise.resolve()),
  };
  transacoes = {
    create: jest.fn(() => Promise.resolve()),
  };
}

describe('AppController', () => {
  let appService: AppService;
  let mockPrisma: MockPrismaConectorService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: PrismaConectorService,
          useClass: MockPrismaConectorService,
        },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
    mockPrisma = app.get<MockPrismaConectorService>(PrismaConectorService);
  });

  describe('getSaldo', () => {
    it('should find saldo', async () => {
      const saldo = 'saldo';
      const id = 1;

      mockPrisma.saldo.findUnique.mockImplementationOnce(() => saldo);

      expect(await appService.getSaldo(id)).toBe(saldo);
      expect(mockPrisma.saldo.findUnique).toHaveBeenCalledTimes(1);
      expect(mockPrisma.saldo.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });
  });

  describe('makeTransaction', () => {
    it('should update saldo and create transaction', async () => {
      const payload = {
        saldoId: 1,
        tipo: 'DEPOSITO',
        valor: '1000',
        status: 'EXECUTADA',
      };
      const saldo = {
        valor: '100',
        vercao: 2,
      };

      mockPrisma.saldo.findUnique.mockImplementationOnce(() =>
        Promise.resolve(saldo),
      );

      await appService.makeTransaction(payload);

      expect(mockPrisma.$transaction).toHaveBeenCalledTimes(1);
      expect(mockPrisma.saldo.findUnique).toHaveBeenCalledTimes(1);
      expect(mockPrisma.saldo.findUnique).toHaveBeenCalledWith({
        where: { id: payload.saldoId },
      });
      expect(mockPrisma.saldo.update).toHaveBeenCalledTimes(1);
      expect(mockPrisma.transacoes.create).toHaveBeenCalledTimes(1);
    });

    it('should recieve error on update and call again the make transaction', async () => {
      const payload = {
        saldoId: 1,
        tipo: 'DEPOSITO',
        valor: '1000',
        status: 'EXECUTADA',
      };
      const saldo = {
        valor: '100',
        vercao: 2,
      };

      mockPrisma.saldo.findUnique.mockImplementation(() =>
        Promise.resolve(saldo),
      );
      mockPrisma.saldo.update.mockImplementationOnce(() => Promise.reject());

      await appService.makeTransaction(payload);

      expect(mockPrisma.$transaction).toHaveBeenCalledTimes(2);
      expect(mockPrisma.saldo.findUnique).toHaveBeenCalledTimes(2);
      expect(mockPrisma.saldo.update).toHaveBeenCalledTimes(2);
      expect(mockPrisma.transacoes.create).toHaveBeenCalledTimes(1);
    });
  });
});
