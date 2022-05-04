import { ApiProperty } from '@nestjs/swagger';

export class ChatInfo {
  @ApiProperty()
  dni: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;
}
