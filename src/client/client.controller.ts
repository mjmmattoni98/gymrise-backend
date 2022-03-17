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
import {
  ClientCreationError,
  ClientService,
  ClientUpdateError,
} from './client.service';
import { client as ClientModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChatModule } from 'src/chat/chat.module';
import { ClientDto } from './dto/client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('add')
  //@UseGuards(JwtAuthGuard)
  async signupUser(@Body() userData: ClientDto): Promise<ClientModel> {
    try {
      return await this.clientService.createClient(userData);
    } catch (error) {
      switch (error) {
        case ClientCreationError.ClientAlreadySignedUp:
          throw new HttpException(
            'Client has already signed up',
            HttpStatus.BAD_REQUEST,
          );
        default:
          throw error;
      }
    }
  }

  @Put('update/:dni')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Param('dni') dni: string,
    @Body() clientData: ClientDto,
  ): Promise<ClientModel> {
    try {
      return await this.clientService.updateClient({ dni, data: clientData });
    } catch (error) {
      switch (error) {
        case ClientUpdateError.ClientDoesntExist:
          throw new HttpException("Client doesn't exists", HttpStatus.GONE);
        default:
          throw error;
      }
    }
  }

  @Delete('delete/:dni')
  async cancelAccount(@Param('dni') dni: string): Promise<ClientModel> {
    try {
      return await this.clientService.deleteClient(dni);
    } catch (error) {
      throw new Error('Error while deleting an acocunt');
    }
  }

  @Get(':dni')
  async getClient(@Param('dni') dni: string): Promise<ClientModel> {
    try {
      return await this.clientService.getClient(dni);
    } catch (error) {
      throw new Error('Error while getting the client account');
    }
  }

  @Get()
  async getAllClients(): Promise<ClientModel[]> {
    try {
      return await this.clientService.clients();
    } catch (error) {
      throw new Error('Error while getting all clients');
    }
  }
}
