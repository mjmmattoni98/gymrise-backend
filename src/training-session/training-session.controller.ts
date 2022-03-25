import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TrainingSessionDto } from './dto/trainingSession.dto';
import {
  training_session as TrainingSessionModel,
  Prisma,
  personal_trainer as PersonalTrainerModel,
} from '@prisma/client';
import { TrainingSessionService } from './training-session.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PersonalTrainerDto } from '../personal-trainer/dto/personalTrainer.dto';

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

  @Delete('delete/:id')
  async deleteTrainingSession(
    @Param('id') id: string,
  ): Promise<TrainingSessionModel> {
    try {
      return await this.trainingSessionService.deleteTrainingSession(
        Number(id),
      );
    } catch (error) {
      throw new Error('Error while deleting the training session');
    }
  }

  @Put('update/:id')
  @ApiBearerAuth()
  async updateTrainingSession(
    @Param('id') id: string,
    @Body() trainingSessionData: TrainingSessionDto,
  ): Promise<TrainingSessionModel> {
    try {
      return await this.trainingSessionService.updateTrainingSession({
        id: Number(id),
        data: trainingSessionData,
      });
    } catch (error) {
      throw new Error('Error while updating the training session');
    }
  }

  @Get(':id')
  async getTrainingSession(
    @Param('id') id: string,
  ): Promise<TrainingSessionModel> {
    try {
      return await this.trainingSessionService.getTrainingSessionById(
        Number(id),
      );
    } catch (error) {
      throw new Error('Error while getting the training session');
    }
  }

  @Get()
  async getAllTrainingSessions(): Promise<TrainingSessionModel[]> {
    try {
      return await this.trainingSessionService.getTrainingSessions();
    } catch (error) {
      throw new Error('Error while getting all training sessions');
    }
  }
}
