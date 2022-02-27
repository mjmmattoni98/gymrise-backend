import { Test, TestingModule } from '@nestjs/testing';
import { TrainingSessionClientController } from './training-session-client.controller';

describe('TrainingSessionClientController', () => {
  let controller: TrainingSessionClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingSessionClientController],
    }).compile();

    controller = module.get<TrainingSessionClientController>(TrainingSessionClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
