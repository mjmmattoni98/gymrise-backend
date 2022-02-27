import { Module } from '@nestjs/common';
import { TrainingSessionClientResolver } from './training-session-client.resolver';

@Module({
  providers: [TrainingSessionClientResolver]
})
export class TrainingSessionClientModule {}
