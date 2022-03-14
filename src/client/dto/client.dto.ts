import { ApiProperty } from '@nestjs/swagger';
import { sex } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class ClientDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  surname: string;

  @IsNotEmpty()
  @ApiProperty()
  dni: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  height: number;

  @IsNotEmpty()
  @ApiProperty()
  weight: number;

  @IsNotEmpty()
  @ApiProperty()
  sex: sex;

  @IsNotEmpty()
  @ApiProperty()
  age: number;
}
