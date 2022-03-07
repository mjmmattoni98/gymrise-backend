import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  ConsoleLogger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClientCreationError, ClientService } from './client.service';
import { client as ClientModel, sex } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChatModule } from 'src/chat/chat.module';
import { ClientDto } from './dto/client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('user')
  //@UseGuards(JwtAuthGuard)
  async signupUser( @Body() userData: ClientDto ): Promise<ClientModel> 
  {
    try {
      return await this.clientService.createClient(userData);
    } catch (error) {
      switch (error) {
        case ClientCreationError.ClientAlreadySignedUp:
          throw new HttpException("Client has already signed up", HttpStatus.BAD_REQUEST);
        default:
          throw error;
      }
    }
  }

  @Delete('user')
  async cancelAccount( @Body() userData: ClientDto ): Promise<ClientModel> {

    try {
      return await this.clientService.deleteUser(userData);
    } catch (error) {
      throw new Error("Error while deleting an acocunt");
    }

  }

}