import { Test, TestingModule } from '@nestjs/testing';
import { ExtratoService } from './extrato.service';

describe('ExtratoService', () => {
  let service: ExtratoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtratoService],
    }).compile();

    service = module.get<ExtratoService>(ExtratoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
