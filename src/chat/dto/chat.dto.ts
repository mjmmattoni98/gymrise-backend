import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class ChatDto {
  @IsNotEmpty()
  @Length(9)
  @ApiProperty()
  dni_client: string;

  @IsNotEmpty()
  @Length(9)
  @ApiProperty()
  dni_trainer: string;

  @IsNotEmpty()
  @ApiProperty()
  text: string;
}
