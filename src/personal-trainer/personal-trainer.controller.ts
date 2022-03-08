import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete, UseGuards, HttpException, HttpStatus, Patch
} from "@nestjs/common";
import { PersonalTrainerService } from './personal-trainer.service';
import { PersonalTrainerCreationError } from "./personal-trainer.service";
import { PersonalTrainerDto } from './dto/personalTrainer.dto';
import { client as ClientModel, personal_trainer as PersonalTrainerModel, Prisma } from "@prisma/client";

@Controller('personal-trainer')
export class PersonalTrainerController {
  constructor(private readonly personalTrainerService: PersonalTrainerService) {}

  @Post('add')
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

  @Delete('delete/:dni')
  async cancelTrainerAccount( @Param ('dni') dni: string ): Promise<PersonalTrainerModel> {

    try {
      return await this.personalTrainerService.deletePersonalTrainer(dni as Prisma.personal_trainerWhereUniqueInput);
    } catch (error) {
      throw new Error("Error while deleting the personal trainer account");
    }

  }

  @Put('update/:dni')
  async updateTrainerAccount(@Param ('dni') dni: string,
                             @Body() trainerData: PersonalTrainerDto ): Promise<PersonalTrainerModel> {
    try{
      return await this.personalTrainerService.updatePersonalTrainer({where:dni as Prisma.personal_trainerWhereUniqueInput
        , data:trainerData})
    }catch (error){
      throw new Error("Error while updating the personal trainer account")
    }
  }
}
