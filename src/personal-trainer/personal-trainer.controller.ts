import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete, UseGuards, HttpException, HttpStatus
} from "@nestjs/common";
import { PersonalTrainerService } from './personal-trainer.service';
import { PersonalTrainerCreationError } from "../personal-trainer/personal-trainer.service";
import { PersonalTrainerDto } from './dto/personalTrainer.dto';
import { personal_trainer as PersonalTrainerModel} from '@prisma/client';

@Controller('personal-trainer')
export class PersonalTrainerController {
  constructor(private readonly personalTrainerService: PersonalTrainerService) {}

  @Post('trainer')
  async signupTrainer( @Body() trainerData: PersonalTrainerDto): Promise<PersonalTrainerModel>
  {
    try {
      return await this.personalTrainerService.createPersonalTrainer(trainerData);
    } catch (error) {
      switch (error) {
        case PersonalTrainerCreationError.PersonalTrainerAlreadySignedUp:
          throw new HttpException("Personal trainer has already signed up", HttpStatus.BAD_REQUEST);
        default:
          throw error;
      }
    }
  }
}
