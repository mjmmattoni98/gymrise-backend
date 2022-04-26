import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Length,
} from 'class-validator';

export class TrainingSessionDto {
  @IsNotEmpty()
  @ApiProperty()
  date: string;

  @IsNotEmpty()
  @ApiProperty()
  time: string;

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
