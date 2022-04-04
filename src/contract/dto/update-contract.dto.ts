import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class UpdateContractDto {
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

  @IsBoolean()
  @ApiProperty({ required: false, nullable: true })
  accepted: boolean;
}
