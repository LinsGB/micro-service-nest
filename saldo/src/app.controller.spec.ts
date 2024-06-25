import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class MockAppService {
  makeTransaction = jest.fn();
  getSaldo = jest.fn();
  createSaldo = jest.fn();
  deleteTransaction = jest.fn();
}

describe('AppController', () => {
  let appController: AppController;
  let appService: MockAppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useClass: MockAppService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<MockAppService>(AppService);
  });

  describe('getSaldo', () => {
    it('should call getSaldo of appService', async () => {
      appService.getSaldo.mockImplementationOnce(() =>
        Promise.resolve('Saldo'),
      );

      expect(await appController.getSaldo({ id: 2 })).toBe('Saldo');

      expect(appService.getSaldo).toHaveBeenCalledTimes(1);
      expect(appService.getSaldo).toHaveBeenCalledWith(2);
    });
  });

  describe('makeTransaction', () => {
    it('should call makeTransaction of appService', async () => {
      const payload = {
        saldoId: 1,
        tipo: 'deposito',
        valor: 1000,
      };

      appController.makeTransaction(payload);

      expect(appService.makeTransaction).toHaveBeenCalledTimes(1);
      expect(appService.makeTransaction).toHaveBeenCalledWith(payload);
    });
  });

  describe('createSaldo', () => {
    it('should call createSaldo of appService', () => {
      appController.createSaldo();

      expect(appService.createSaldo).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteTransaction', () => {
    it('should call deleteTransaction of appService', () => {
      appController.deleteTransaction({ id: 1 });

      expect(appService.deleteTransaction).toHaveBeenCalledTimes(1);
    });
  });
});
