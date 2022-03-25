import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  PersonalTrainerService,
  PersonalTrainerUpdateError,
} from './personal-trainer.service';
import { PersonalTrainerCreationError } from './personal-trainer.service';
import { PersonalTrainerDto } from './dto/personalTrainer.dto';
import { personal_trainer as PersonalTrainerModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('personal-trainer')
export class PersonalTrainerController {
  constructor(
    private readonly personalTrainerService: PersonalTrainerService,
  ) {}

  @Get(':dni')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getTrainer(@Param('dni') dni: string): Promise<PersonalTrainerModel> {
    try {
      return await this.personalTrainerService.getPersonalTrainer(dni);
    } catch (error) {
      throw new HttpException(
        'Personal trainer not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get()
  async getTrainers(): Promise<PersonalTrainerModel[]> {
    try {
      return await this.personalTrainerService.getPersonalTrainers();
    } catch (error) {
      throw new Error('Error while getting all the trainers');
    }
  }

  @Post('add')
  async signupTrainer(
    @Body() trainerData: PersonalTrainerDto,
  ): Promise<PersonalTrainerModel> {
    try {
      return await this.personalTrainerService.createPersonalTrainer(
        trainerData,
      );
    } catch (error) {
      switch (error) {
        case PersonalTrainerCreationError.PersonalTrainerAlreadySignedUp:
          throw new HttpException(
            'Personal trainer has already signed up',
            HttpStatus.BAD_REQUEST,
          );
        default:
          throw error;
      }
    }
  }

  @Put('update/:dni')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateTrainer(
    @Param('dni') dni: string,
    @Body() trainerData: PersonalTrainerDto,
  ): Promise<PersonalTrainerModel> {
    try {
      return await this.personalTrainerService.updatePersonalTrainer({
        dni,
        data: trainerData,
      });
    } catch (error) {
      switch (error) {
        case PersonalTrainerUpdateError.PersonalTrainerDoesntExist:
          throw new HttpException(
            "Personal trainer doesn't found to update",
            HttpStatus.NOT_FOUND,
          );
        default:
          throw error;
      }
    }
  }

  @Delete('delete/:dni')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteTrainerAccount(
    @Param('dni') dni: string,
  ): Promise<PersonalTrainerModel> {
    try {
      return await this.personalTrainerService.deletePersonalTrainer(dni);
    } catch (error) {
      throw new Error('Error while deleting the personal trainer account');
    }
  }
}
