import { ApiProperty } from '@nestjs/swagger';

export class Chat {
  @ApiProperty()
  dni_client: string;

  @ApiProperty()
  name_client: string;

  @ApiProperty()
  surname_client: string;

  @ApiProperty()
  dni_trainer: string;

  @ApiProperty()
  name_trainer: string;

  @ApiProperty()
  surname_trainer: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  date_time: Date;

  @ApiProperty()
  sender: string;
}
