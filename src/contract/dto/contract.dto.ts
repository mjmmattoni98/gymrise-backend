import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Length,
} from 'class-validator';

export class ContractDto {
  @IsNotEmpty()
  @Length(9)
  @ApiProperty()
  dni_trainer: string;

  @IsNotEmpty()
  @Length(9)
  @ApiProperty()
  dni_client: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
  @ApiProperty()
  end_date: Date;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  price: number;

  @ApiProperty()
  @IsBoolean()
  accepted: boolean;
}
