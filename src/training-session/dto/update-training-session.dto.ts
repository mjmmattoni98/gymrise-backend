import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Length,
} from 'class-validator';

export class UpdateTrainingSessionDto {
  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  date: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  time: Date;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @Length(9)
  @ApiProperty()
  dni: string;
}
