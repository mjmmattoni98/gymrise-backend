import { ApiProperty } from '@nestjs/swagger';

export class TrainingSession {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  date_time: Date;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  dni: string;
}
