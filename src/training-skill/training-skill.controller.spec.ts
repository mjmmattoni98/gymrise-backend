import { Test, TestingModule } from '@nestjs/testing';
import { TrainingSkillController } from './training-skill.controller';

describe('TrainingSkillController', () => {
  let controller: TrainingSkillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingSkillController],
    }).compile();

    controller = module.get<TrainingSkillController>(TrainingSkillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
