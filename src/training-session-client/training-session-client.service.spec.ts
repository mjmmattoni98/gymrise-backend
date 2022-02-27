import { Test, TestingModule } from '@nestjs/testing';
import { TrainingSessionClientService } from './training-session-client.service';

describe('TrainingSessionClientService', () => {
  let service: TrainingSessionClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingSessionClientService],
    }).compile();

    service = module.get<TrainingSessionClientService>(TrainingSessionClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
