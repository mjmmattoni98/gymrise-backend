import { Module } from '@nestjs/common';
import { TrainingSessionService } from './training-session.service';
import { TrainingSessionController } from './training-session.controller';
import { TrainingSessionResolver } from './training-session.resolver';

@Module({
  providers: [TrainingSessionService, TrainingSessionResolver],
  controllers: [TrainingSessionController],
})
export class TrainingSessionModule {}
