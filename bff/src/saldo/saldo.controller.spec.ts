import { Test, TestingModule } from '@nestjs/testing';
import { SaldoController } from './saldo.controller';
import { SaldoService } from './saldo.service';

class MockSaldoService {
  getSaldo = jest.fn();
  createSaldo = jest.fn();
}

describe('SaldoController', () => {
  let controller: SaldoController;
  let service: MockSaldoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaldoController],
      providers: [{ provide: SaldoService, useClass: MockSaldoService }],
    }).compile();

    controller = module.get<SaldoController>(SaldoController);
    service = module.get<MockSaldoService>(SaldoService);
  });

  describe('getSaldo', () => {
    it('should call getSaldo of saldoService', () => {
      const id = '1';
      const result = 'Result';

      service.getSaldo.mockReturnValue(result);

      expect(controller.getSaldo(id)).toEqual(result);

      expect(service.getSaldo).toHaveBeenCalledTimes(1);
      expect(service.getSaldo).toHaveBeenCalledWith(id);
    });
  });

  describe('createSaldo', () => {
    it('should call getSaldo of saldoService', () => {
      const result = 'Result';

      service.createSaldo.mockReturnValue(result);

      expect(controller.createSaldo()).toEqual(result);

      expect(service.createSaldo).toHaveBeenCalledTimes(1);
    });
  });
});
