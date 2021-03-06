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
import {
  personal_trainer as PersonalTrainerModel,
  skill,
  training_skill as TrainingSkillModel,
} from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePersonalTrainerDto } from './dto/update-personal-trainer.dto';
import { Roles } from '../users/roles/roles.decorator';
import { Role } from '../users/roles/role.enum';
import { EMAIL_REGEXP } from '../const';
import { RolesGuard } from '../users/roles/roles.guard';

@Controller('personal-trainer')
@ApiTags('personal-trainer')
export class PersonalTrainerController {
  constructor(
    private readonly personalTrainerService: PersonalTrainerService,
  ) {}

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.PERSONAL_TRAINER)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PersonalTrainerDto })
  @ApiBearerAuth()
  async getTrainer(@Param('id') id: string): Promise<PersonalTrainerModel> {
    try {
      if (EMAIL_REGEXP.test(id.toUpperCase())) {
        return await this.personalTrainerService.getPersonalTrainerByEmail(
          id.toLowerCase(),
        );
      }
      return await this.personalTrainerService.getPersonalTrainerByDni(
        id.toUpperCase(),
      );
    } catch (error) {
      throw new HttpException(
        'Personal trainer not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('skills/:dni')
  async getSkillsTrainer(@Param('dni') dni: string): Promise<string[]> {
    try {
      if (dni.toUpperCase() === 'ALL') {
        return this.personalTrainerService.getSkills();
      }
      return await this.personalTrainerService.getSkillsTrainer(
        dni.toUpperCase(),
      );
    } catch (error) {
      throw new HttpException(
        'No skills found for this personal trainer',
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
      trainerData.email = trainerData.email.toLowerCase();
      trainerData.dni = trainerData.dni.toUpperCase();
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

  @Post('add/:dni/skill/:skill')
  @UseGuards(RolesGuard)
  @Roles(Role.PERSONAL_TRAINER)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async addTrainerSkill(
    @Param('dni') dni: string,
    @Param('skill') trainerSkill: skill,
  ): Promise<TrainingSkillModel> {
    try {
      return await this.personalTrainerService.addPersonalTrainerSkill(
        dni.toUpperCase(),
        trainerSkill,
      );
    } catch (error) {
      throw new Error('Error while adding skill to trainer');
    }
  }

  @Put('update/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.PERSONAL_TRAINER)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PersonalTrainerDto })
  @ApiBearerAuth()
  async updateTrainer(
    @Param('id') id: string,
    @Body() trainerData: UpdatePersonalTrainerDto,
  ): Promise<PersonalTrainerModel> {
    try {
      if (EMAIL_REGEXP.test(id.toUpperCase())) {
        return await this.personalTrainerService.updatePersonalTrainerByEmail({
          email: id.toLowerCase(),
          data: trainerData,
        });
      }
      return await this.personalTrainerService.updatePersonalTrainerByDni({
        dni: id.toUpperCase(),
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

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.PERSONAL_TRAINER)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: PersonalTrainerDto })
  @ApiBearerAuth()
  async deleteTrainerAccount(
    @Param('id') id: string,
  ): Promise<PersonalTrainerModel> {
    try {
      if (EMAIL_REGEXP.test(id.toUpperCase())) {
        return await this.personalTrainerService.deletePersonalTrainerByEmail(
          id.toLowerCase(),
        );
      }
      return await this.personalTrainerService.deletePersonalTrainerByDni(
        id.toUpperCase(),
      );
    } catch (error) {
      throw new Error('Error while deleting the personal trainer account');
    }
  }

  @Delete('delete/:dni/skill/:skill')
  @UseGuards(RolesGuard)
  @Roles(Role.PERSONAL_TRAINER)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteTrainerSkill(
    @Param('dni') dni: string,
    @Param('skill') trainerSkill: skill,
  ): Promise<TrainingSkillModel> {
    try {
      return await this.personalTrainerService.deletePersonalTrainerSkill(
        dni.toUpperCase(),
        trainerSkill,
      );
    } catch (error) {
      throw new Error('Error while removing skill from trainer');
    }
  }
}
