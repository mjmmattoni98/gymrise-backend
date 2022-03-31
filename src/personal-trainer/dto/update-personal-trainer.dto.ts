import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class UpdatePersonalTrainerDto {
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
}
