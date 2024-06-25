import { Test, TestingModule } from '@nestjs/testing';
import { PrismaConectorService } from './prisma-conector.service';

describe('PrismaConectorService', () => {
  let service: PrismaConectorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaConectorService],
    }).compile();

    service = module.get<PrismaConectorService>(PrismaConectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
