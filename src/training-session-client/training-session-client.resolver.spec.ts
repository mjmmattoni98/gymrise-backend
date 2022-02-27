import { Test, TestingModule } from '@nestjs/testing';
import { TrainingSessionClientResolver } from './training-session-client.resolver';

describe('TrainingSessionClientResolver', () => {
  let resolver: TrainingSessionClientResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingSessionClientResolver],
    }).compile();

    resolver = module.get<TrainingSessionClientResolver>(TrainingSessionClientResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
