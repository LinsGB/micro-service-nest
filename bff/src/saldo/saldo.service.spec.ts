import { Test, TestingModule } from '@nestjs/testing';
import { SaldoService } from './saldo.service';

class MockClientProxy {
  emit = jest.fn();
  send = jest.fn();
}

jest.mock('rxjs', () => {
  return {
    ...jest.requireActual('rxjs'),
    lastValueFrom: () =>
      new Promise((resolve) => {
        resolve(true);
      }),
  };
});

describe('SaldoService', () => {
  let service: SaldoService;
  let mockClientProxy: MockClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaldoService,
        {
          provide: 'SALDO_SERVICE',
          useClass: MockClientProxy,
        },
      ],
    }).compile();

    service = module.get<SaldoService>(SaldoService);
    mockClientProxy = module.get<MockClientProxy>('SALDO_SERVICE');
  });

  describe('createSaldo', () => {
    it('should emit and return a valid mensage', async () => {
      expect(await service.createSaldo()).toEqual({
        message: 'Saldo Criado',
      });

      expect(mockClientProxy.emit).toHaveBeenCalledTimes(1);
      expect(mockClientProxy.emit).toHaveBeenCalledWith('create-saldo', {});
    });
  });

  describe('getSaldo', () => {
    it('should send and return a valid mensage', async () => {
      const id = '1';

      mockClientProxy.send.mockImplementation(() => Promise.resolve('result'));

      await service.getSaldo(id);

      expect(mockClientProxy.send).toHaveBeenCalledTimes(1);
      expect(mockClientProxy.send).toHaveBeenCalledWith(
        { cmd: 'get-saldo' },
        { id: +id },
      );
    });
  });
});
