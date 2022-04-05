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
  PersonalTrainerCreationError,
} from './personal-trainer.service';
import { PersonalTrainerDto } from './dto/personal-trainer.dto';
import { personal_trainer as PersonalTrainerModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePersonalTrainerDto } from './dto/update-personal-trainer.dto';
import { Roles } from '../users/roles/roles.decorator';
import { Role } from '../users/roles/role.enum';

@Controller('personal-trainer')
@ApiTags('personal-trainer')
export class PersonalTrainerController {
  constructor(
    private readonly personalTrainerService: PersonalTrainerService,
  ) {}

  @Get(':dni')
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PersonalTrainerDto })
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
  @ApiOkResponse({ type: [PersonalTrainerDto] })
  async getTrainers(): Promise<PersonalTrainerModel[]> {
    try {
      return await this.personalTrainerService.getPersonalTrainers();
    } catch (error) {
      throw new Error('Error while getting all the trainers');
    }
  }

  @Post('add')
  @ApiOkResponse({ type: PersonalTrainerDto })
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
  @ApiOkResponse({ type: PersonalTrainerDto })
  @ApiBearerAuth()
  async updateTrainer(
    @Param('dni') dni: string,
    @Body() trainerData: UpdatePersonalTrainerDto,
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
  @ApiOkResponse({ type: PersonalTrainerDto })
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
