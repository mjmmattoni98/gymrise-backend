import { ApiProperty } from '@nestjs/swagger';

export class TrainingSessionInfo {
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

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;
}
