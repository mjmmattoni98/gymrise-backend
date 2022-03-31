import { ApiProperty } from '@nestjs/swagger';
import { sex } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsPositive, MaxLength } from 'class-validator';

export class UpdateClientDto {
  @IsNotEmpty()
  @MaxLength(40)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @MaxLength(40)
  @ApiProperty()
  surname: string;

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
