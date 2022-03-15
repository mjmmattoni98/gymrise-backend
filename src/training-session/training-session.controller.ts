import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { TrainingSessionDto } from './dto/trainingSession.dto';
import {
  training_session as TrainingSessionModel,
  Prisma,
} from '@prisma/client';
import {
  PersonalTrainerCreationError,
  PersonalTrainerService,
} from '../personal-trainer/personal-trainer.service';
import { TrainingSessionService } from './training-session.service';

@Controller('training-session')
export class TrainingSessionController {
  constructor(
    private readonly trainingSessionService: TrainingSessionService,
  ) {}

  @Post('add')
  async addSessionTrainer(
    @Body() sessionData: TrainingSessionDto,
  ): Promise<TrainingSessionModel> {
    try {
      const prismaSessionObject: Prisma.training_sessionCreateInput = {
        date: sessionData.date,
        time: sessionData.time,
        description: sessionData.description,
        price: sessionData.price,
        personal_trainer: {
          connect: {
            dni: sessionData.dni,
          },
        },
      };
      return await this.trainingSessionService.createSession(
        prismaSessionObject,
      );
    } catch (error) {
      throw new Error('Error while creating the personal trainer session');
    }
  }
}
