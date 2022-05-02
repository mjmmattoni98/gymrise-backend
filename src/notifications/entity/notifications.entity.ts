import { ApiProperty } from '@nestjs/swagger';

export class Notifications {
  @ApiProperty()
  id: number;

  @ApiProperty()
  date_time: Date;

  @ApiProperty()
  dni: string;

  @ApiProperty()
  text: string;
}
