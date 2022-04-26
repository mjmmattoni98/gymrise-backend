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
  date_time: Date;

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
