import { ApiProperty } from '@nestjs/swagger';

export class ContractClient {
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
  name_trainer: string;

  @ApiProperty()
  surname_trainer: string;
}
