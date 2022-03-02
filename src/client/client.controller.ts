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
import { client, client as ClientModel } from "@prisma/client";
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService, private Client: client) {

  }

  @Post('user')
  @UseGuards(JwtAuthGuard)
  async signupUser( @Body() userData: {
      name: String,
      surname: String,
      dni: String,
      password: String,
      email: string,
      description: string,
      height: number,


    } ): Promise<ClientModel> {
    return this.clientService.createClient(this.Client);
  }
}