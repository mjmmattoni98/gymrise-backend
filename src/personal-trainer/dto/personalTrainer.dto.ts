import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, MaxLength } from 'class-validator';

export class PersonalTrainerDto {
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
  @MaxLength(40)
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
