import { Test, TestingModule } from '@nestjs/testing';
import { SaldoController } from './saldo.controller';
import { SaldoService } from './saldo.service';

describe('SaldoController', () => {
  let controller: SaldoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaldoController],
      providers: [SaldoService],
    }).compile();

    controller = module.get<SaldoController>(SaldoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
