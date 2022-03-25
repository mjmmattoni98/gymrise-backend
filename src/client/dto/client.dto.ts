import { ApiProperty } from '@nestjs/swagger';
import { sex } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Length,
  MaxLength,
} from 'class-validator';

export class ClientDto {
  @IsNotEmpty()
  @MaxLength(40)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @MaxLength(40)
  @ApiProperty()
  surname: string;

  @IsNotEmpty()
  @Length(9)
  @ApiProperty()
  dni: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(40)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  height: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  weight: number;

  @IsNotEmpty()
  @ApiProperty()
  sex: sex;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @ApiProperty()
  age: number;
}
