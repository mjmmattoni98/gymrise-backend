import { Test, TestingModule } from '@nestjs/testing';
import { PersonalTrainerService } from './personal-trainer.service';

describe('PersonalTrainerService', () => {
  let service: PersonalTrainerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalTrainerService],
    }).compile();

    service = module.get<PersonalTrainerService>(PersonalTrainerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
