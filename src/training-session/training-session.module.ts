import { Module } from '@nestjs/common';
import { TrainingSessionService } from './training-session.service';
import { TrainingSessionController } from './training-session.controller';
import { TrainingSessionResolver } from './training-session.resolver';
import { PrismaService } from "../prisma.service";

@Module({
  providers: [TrainingSessionService, TrainingSessionResolver, PrismaService],
  controllers: [TrainingSessionController],
})
export class TrainingSessionModule {}
