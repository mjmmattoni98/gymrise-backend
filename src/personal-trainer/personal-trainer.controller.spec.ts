import { Test, TestingModule } from '@nestjs/testing';
import { PersonalTrainerController } from './personal-trainer.controller';

describe('PersonalTrainerController', () => {
  let controller: PersonalTrainerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalTrainerController],
    }).compile();

    controller = module.get<PersonalTrainerController>(PersonalTrainerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
