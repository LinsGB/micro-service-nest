import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './transaction.dto';

class MockClientProxy {
  emit = jest.fn();
}

describe('TransactionService', () => {
  let service: TransactionService;
  let mockClientProxy: MockClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: 'TRANSACTION_SERVICE',
          useClass: MockClientProxy,
        },
      ],
    }).compile();

    service = module.get<TransactionService>(TransactionService);
    mockClientProxy = module.get<MockClientProxy>('TRANSACTION_SERVICE');
  });

  describe('makeTransaction', () => {
    it('should emit and return a valid mensage', () => {
      const payload: TransactionDto = {
        saldoId: 1,
        tipo: 'DEPOSITO',
        valor: '1000',
      };

      expect(service.makeTransaction(payload)).toEqual({
        message: 'Ordem de transação enviada',
      });

      expect(mockClientProxy.emit).toHaveBeenCalledTimes(1);
      expect(mockClientProxy.emit).toHaveBeenCalledWith(
        'make-transaction',
        payload,
      );
    });
  });

  describe('cancelTransaction', () => {
    it('should emit and return a valid mensage', () => {
      const id = '1';

      expect(service.cancelTransaction(id)).toEqual({
        message: 'Ordem de cancelamento enviada',
      });

      expect(mockClientProxy.emit).toHaveBeenCalledTimes(1);
      expect(mockClientProxy.emit).toHaveBeenCalledWith('delete-transaction', {
        id: +id,
      });
    });
  });
});
