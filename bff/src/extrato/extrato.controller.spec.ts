import { Test, TestingModule } from '@nestjs/testing';
import { ExtratoController } from './extrato.controller';
import { ExtratoService } from './extrato.service';

class MockSaldoService {
  getExtrato = jest.fn();
}

describe('ExtratoController', () => {
  let controller: ExtratoController;
  let service: MockSaldoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtratoController],
      providers: [{ provide: ExtratoService, useClass: MockSaldoService }],
    }).compile();

    controller = module.get<ExtratoController>(ExtratoController);
    service = module.get<MockSaldoService>(ExtratoService);
  });

  describe('getExtrato', () => {
    it('should call getSaldo of saldoService', () => {
      const id = '1';
      const result = 'Result';

      service.getExtrato.mockReturnValue(result);

      expect(controller.getExtrato(id)).toEqual(result);

      expect(service.getExtrato).toHaveBeenCalledTimes(1);
      expect(service.getExtrato).toHaveBeenCalledWith(id);
    });
  });
});
