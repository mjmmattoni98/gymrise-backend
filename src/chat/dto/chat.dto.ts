import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, Length } from 'class-validator';

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
  @IsDate()
  @ApiProperty()
  date_time: Date;

  @IsNotEmpty()
  @ApiProperty()
  text: string;

  @IsNotEmpty()
  @Length(9)
  @ApiProperty()
  sender: string;
}
