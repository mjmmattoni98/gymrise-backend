import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import  { PersonalTrainerDto as personal_trainer } from '../../personal-trainer/dto/personalTrainer.dto'

export class personal_trainerCreateNestedOneWithoutTraining_sessionInput {
  create?: personal_trainer;
}

export class TrainingSessionDto {
  @IsNotEmpty()
  @ApiProperty()
  id: number

  @IsNotEmpty()
  @ApiProperty()
  date: Date

  @IsNotEmpty()
  @ApiProperty()
  time: Date


  @IsNotEmpty()
  @ApiProperty()
  description: string

  @IsNotEmpty()
  @ApiProperty()
  price: number

  @IsNotEmpty()
  @ApiProperty()
  personal_trainer: personal_trainerCreateNestedOneWithoutTraining_sessionInput
}
