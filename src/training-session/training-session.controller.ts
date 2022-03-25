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
} from '@prisma/client';
import { TrainingSessionService } from './training-session.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('training-session')
export class TrainingSessionController {
  constructor(
    private readonly trainingSessionService: TrainingSessionService,
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getTrainingSession(
    @Param('id') id: string,
  ): Promise<TrainingSessionModel> {
    try {
      return await this.trainingSessionService.getTrainingSessionById(
        Number(id),
      );
    } catch (error) {
      throw new HttpException(
        'Training session not found',
        HttpStatus.NOT_FOUND,
      );
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

  @Post('add')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async addTrainingSession(
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
      throw new Error('Error while creating the training session');
    }
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
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

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
}
