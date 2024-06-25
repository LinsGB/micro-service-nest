import { Test, TestingModule } from '@nestjs/testing';
import { ExtratoService } from './extrato.service';

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

describe('ExtratoService', () => {
  let service: ExtratoService;
  let mockClientProxy: MockClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExtratoService,
        {
          provide: 'EXTRATO_SERVICE',
          useClass: MockClientProxy,
        },
      ],
    }).compile();

    service = module.get<ExtratoService>(ExtratoService);
    mockClientProxy = module.get<MockClientProxy>('EXTRATO_SERVICE');
  });

  describe('getExtrato', () => {
    it('should send and return a valid mensage', async () => {
      const id = '1';

      mockClientProxy.send.mockImplementation(() => Promise.resolve('result'));

      await service.getExtrato(id);

      expect(mockClientProxy.send).toHaveBeenCalledTimes(1);
      expect(mockClientProxy.send).toHaveBeenCalledWith(
        { cmd: 'get-extrato' },
        { id: +id },
      );
    });
  });
});
