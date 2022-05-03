import { ApiProperty } from '@nestjs/swagger';

export class Chat {
  @ApiProperty()
  dni_client: string;

  @ApiProperty()
  dni_trainer: string;

  @ApiProperty()
  text: string;

  @ApiProperty()
  date_time: Date;
}
