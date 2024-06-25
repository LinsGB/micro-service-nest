import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

class MockAppService {
  getTransactions = jest.fn();
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

  describe('getTransactions', () => {
    it('should call getTransactions of appService and return valid value"', async () => {
      appService.getTransactions.mockImplementationOnce(() =>
        Promise.resolve('extrato'),
      );

      expect(await appController.getTransactions({ id: '1' })).toBe('extrato');
      expect(appService.getTransactions).toHaveBeenCalledTimes(1);
      expect(appService.getTransactions).toHaveBeenCalledWith('1');
    });
  });
});
