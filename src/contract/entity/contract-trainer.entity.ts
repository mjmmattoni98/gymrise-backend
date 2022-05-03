import { ApiProperty } from '@nestjs/swagger';

export class ContractTrainer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  dni_trainer: string;

  @ApiProperty()
  dni_client: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty()
  price: number;

  @ApiProperty()
  accepted: boolean;

  @ApiProperty()
  name_client: string;

  @ApiProperty()
  surname_client: string;
}
