import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { PrismaConectorService } from './prisma-conector/prisma-conector.service';

class MockPrismaConectorService {
  transacoes = {
    findMany: jest.fn(),
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

  describe('getTransactions', () => {
    it('should call getTransactions of appService and return valid value"', async () => {
      const transactions = ['transação1', 'transação2'];
      const id = '1';

      mockPrisma.transacoes.findMany.mockImplementationOnce(() => transactions);

      expect(await appService.getTransactions(id)).toBe(transactions);
      expect(mockPrisma.transacoes.findMany).toHaveBeenCalledTimes(+id);
      expect(mockPrisma.transacoes.findMany).toHaveBeenCalledWith({
        where: { saldoId: 1 },
      });
    });
  });
});
