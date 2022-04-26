import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TrainingSessionDto } from './dto/training-session.dto';
import {
  training_session as TrainingSessionModel,
  training_session_client as TrainingSessionClientModel,
  Prisma,
} from '@prisma/client';
import { TrainingSessionService } from './training-session.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateTrainingSessionDto } from './dto/update-training-session.dto';
import { RolesGuard } from '../users/roles/roles.guard';
import { Role } from '../users/roles/role.enum';
import { Roles } from '../users/roles/roles.decorator';

@Controller('training-session')
@ApiTags('training-session')
export class TrainingSessionController {
  logger: Logger = new Logger('TrainingSessionController');

  constructor(
    private readonly trainingSessionService: TrainingSessionService,
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TrainingSessionDto })
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

  @Get('trainer/:dni')
  @ApiOkResponse({ type: [TrainingSessionDto] })
  async getTrainingSessionsTrainer(
    @Param('dni') dni: string,
  ): Promise<TrainingSessionModel[]> {
    try {
      return await this.trainingSessionService.getTrainingSessionsForTrainer(
        dni,
      );
    } catch (error) {
      throw new HttpException(
        `Training sessions not found for trainer with dni ${dni}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('client/:dni')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [TrainingSessionDto] })
  @ApiBearerAuth()
  async getTrainingSessionsClient(
    @Param('dni') dni: string,
  ): Promise<TrainingSessionModel[]> {
    try {
      return await this.trainingSessionService.getTrainingSessionsForClient(
        dni,
      );
    } catch (error) {
      throw new HttpException(
        `Training sessions not found for client with dni ${dni}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get()
  @ApiOkResponse({ type: [TrainingSessionDto] })
  async getTrainingSessionsAvailable(): Promise<TrainingSessionModel[]> {
    try {
      this.logger.log('Controller: Getting all training sessions available');
      return await this.trainingSessionService.getTrainingSessionsAvailable();
    } catch (error) {
      throw new Error('Error while getting all training sessions');
    }
  }

/*  @Get()
  @ApiOkResponse({ type: [TrainingSessionDto] })
  async getAllTrainingSessions(): Promise<TrainingSessionModel[]> {
    try {
      this.logger.log('Controller: Getting all training sessions');
      return await this.trainingSessionService.getTrainingSessions();
    } catch (error) {
      throw new Error('Error while getting all training sessions');
    }
  }*/

  @Post('add')
  @UseGuards(RolesGuard)
  @Roles(Role.PERSONAL_TRAINER)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TrainingSessionDto })
  @ApiBearerAuth()
  async addTrainingSession(
    @Body() sessionData: TrainingSessionDto,
  ): Promise<TrainingSessionModel> {
    try {
      const prismaSessionObject: Prisma.training_sessionCreateInput = {
        date_time: sessionData.date_time,
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

  @Post('session/:id/client/:dni')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TrainingSessionDto })
  @ApiBearerAuth()
  async addClientToSession(
    @Param('id') id: string,
    @Param('dni') dni: string,
  ): Promise<TrainingSessionClientModel> {
    try {
      return await this.trainingSessionService.addClientToSession({
        id: Number(id),
        dni,
      });
    } catch (error) {
      throw new Error('Error while adding client to session');
    }
  }

  @Put('update/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.PERSONAL_TRAINER)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TrainingSessionDto })
  @ApiBearerAuth()
  async updateTrainingSession(
    @Param('id') id: string,
    @Body() trainingSessionData: UpdateTrainingSessionDto,
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

  @Delete('delete/:id/client/:dni')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TrainingSessionDto })
  @ApiBearerAuth()
  async removeClientFromSession(
    @Param('id') id: string,
    @Param('dni') dni: string,
  ): Promise<TrainingSessionClientModel> {
    try {
      return await this.trainingSessionService.removeClientFromSession({
        id: Number(id),
        dni,
      });
    } catch (error) {
      throw new Error('Error while removing client from session');
    }
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.PERSONAL_TRAINER)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: TrainingSessionDto })
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
