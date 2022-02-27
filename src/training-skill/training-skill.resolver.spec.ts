import { Test, TestingModule } from '@nestjs/testing';
import { TrainingSkillResolver } from './training-skill.resolver';

describe('TrainingSkillResolver', () => {
  let resolver: TrainingSkillResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingSkillResolver],
    }).compile();

    resolver = module.get<TrainingSkillResolver>(TrainingSkillResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
