import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { client as ClientModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('user')
  @UseGuards(JwtAuthGuard)
  async signupUser( @Body() userData: {
      name: String,
      surname: String,
      dni: String,
      password: tring,
      email: string,
      description: string,
      height: Int,


    } ): Promise<ClientModel> {
    return this.clientService.createClient(userData);
  }
}


name                    String                    @db.VarChar(40)
  surname                 String                    @db.VarChar(40)
  dni                     String                    @id(map: "client_pk") @db.VarChar(9)
  password                String                    @db.VarChar(30)
  email                   String                    @db.VarChar(40)
  description             String
  height                  Int
  weight                  Int
  sex                     sex
  age                     Int
  chat                    chat[]
  contract                contract[]
  training_session_client training_session_client[]