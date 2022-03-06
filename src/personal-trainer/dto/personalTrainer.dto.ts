import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PersonalTrainerDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @ApiProperty()
  surname: string

  @IsNotEmpty()
  @ApiProperty()
  dni: string

  @IsNotEmpty()
  @ApiProperty()
  password: string

  @IsNotEmpty()
  @ApiProperty()
  email: string

  @IsNotEmpty()
  @ApiProperty()
  description: string
}
