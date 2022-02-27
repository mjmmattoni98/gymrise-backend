import { Test, TestingModule } from '@nestjs/testing';
import { TrainingSessionResolver } from './training-session.resolver';

describe('TrainingSessionResolver', () => {
  let resolver: TrainingSessionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingSessionResolver],
    }).compile();

    resolver = module.get<TrainingSessionResolver>(TrainingSessionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
