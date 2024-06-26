import { Test, TestingModule } from '@nestjs/testing';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionDto } from './transaction.dto';

class MockTransactionService {
  makeTransaction = jest.fn();
  cancelTransaction = jest.fn();
}

describe('TransactionController', () => {
  let controller: TransactionController;
  let service: MockTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionController],
      providers: [
        { provide: TransactionService, useClass: MockTransactionService },
      ],
    }).compile();

    controller = module.get<TransactionController>(TransactionController);
    service = module.get<MockTransactionService>(TransactionService);
  });

  describe('makeTransaction', () => {
    it('should call makeTransaction of transactionService', () => {
      const response = 'response';
      const payload: TransactionDto = {
        saldoId: 1,
        tipo: 'DEPOSITO',
        valor: '1000',
      };

      service.makeTransaction.mockReturnValueOnce(response);

      expect(controller.makeTransaction(payload)).toEqual(response);
      expect(service.makeTransaction).toHaveBeenCalledTimes(1);
      expect(service.makeTransaction).toHaveBeenCalledWith(payload);
    });
  });

  describe('cancelTransaction', () => {
    it('should call cancelTransaction of transactionService', () => {
      const response = 'response';
      const id = '1';

      service.cancelTransaction.mockReturnValueOnce(response);

      expect(controller.cancelTransaction(id)).toEqual(response);
      expect(service.cancelTransaction).toHaveBeenCalledTimes(1);
      expect(service.cancelTransaction).toHaveBeenCalledWith(id);
    });
  });
});
