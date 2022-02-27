import { Test, TestingModule } from '@nestjs/testing';
import { PersonalTrainerResolver } from './personal-trainer.resolver';

describe('PersonalTrainerResolver', () => {
  let resolver: PersonalTrainerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalTrainerResolver],
    }).compile();

    resolver = module.get<PersonalTrainerResolver>(PersonalTrainerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
