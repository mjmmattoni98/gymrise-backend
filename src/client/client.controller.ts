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
import { client as ClientModel, sex } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChatModule } from 'src/chat/chat.module';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('user')
  @UseGuards(JwtAuthGuard)
  async signupUser( @Body() userData: {
      name: string,
      surname: string,
      dni: string,
      password: string,
      email: string,
      description: string,
      height: number,
      weight: number,
      sex: sex,
      age: number
    } ): Promise<ClientModel> {
    return this.clientService.createClient(userData);
  }
}