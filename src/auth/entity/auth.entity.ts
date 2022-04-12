import { ApiProperty } from '@nestjs/swagger';

export class Auth {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  dni: string;

  @ApiProperty()
  name: string;
}
