import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
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
import { ClientDto } from './dto/client.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get(':dni')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async getClient(@Param('dni') dni: string): Promise<ClientModel> {
    try {
      return await this.clientService.getClientByDni(dni);
    } catch (error) {
      throw new HttpException('Client not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get()
  async getClients(): Promise<ClientModel[]> {
    try {
      return await this.clientService.getClients();
    } catch (error) {
      throw new Error('Error while getting all clients');
    }
  }

  @Post('add')
  async signupClient(@Body() userData: ClientDto): Promise<ClientModel> {
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
  @ApiBearerAuth()
  async updateClient(
    @Param('dni') dni: string,
    @Body() clientData: ClientDto,
  ): Promise<ClientModel> {
    try {
      return await this.clientService.updateClient({ dni, data: clientData });
    } catch (error) {
      switch (error) {
        case ClientUpdateError.ClientDoesntExist:
          throw new HttpException(
            "Client doesn't found to update",
            HttpStatus.NOT_FOUND,
          );
        default:
          throw error;
      }
    }
  }

  @Delete('delete/:dni')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteClientAccount(@Param('dni') dni: string): Promise<ClientModel> {
    try {
      return await this.clientService.deleteClient(dni);
    } catch (error) {
      throw new HttpException(
        "Client doesn't found to delete",
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
