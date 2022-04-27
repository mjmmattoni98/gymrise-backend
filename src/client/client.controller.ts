import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  UseGuards,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  ClientCreationError,
  ClientService,
  ClientUpdateError,
} from './client.service';
import { client as ClientModel } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ClientDto } from './dto/client.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/users/roles/roles.decorator';
import { Role } from 'src/users/roles/role.enum';
import { RolesGuard } from 'src/users/roles/roles.guard';
import { UpdateClientDto } from './dto/update-client.dto';
import { EMAIL_REGEXP } from '../const';

@Controller('client')
@ApiTags('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ClientDto })
  @ApiBearerAuth()
  async getClient(@Param('id') id: string): Promise<ClientModel> {
    try {
      if (EMAIL_REGEXP.test(id.toUpperCase())) {
        return await this.clientService.getClientByEmail(id.toUpperCase());
      }
      return await this.clientService.getClientByDni(id.toUpperCase());
    } catch (error) {
      throw new NotFoundException('Client not found');
    }
  }

  @Get()
  @ApiOkResponse({ type: [ClientDto] })
  async getClients(): Promise<ClientModel[]> {
    try {
      return await this.clientService.getClients();
    } catch (error) {
      throw new Error('Error while getting all clients');
    }
  }

  @Post('add')
  @ApiOkResponse({ type: ClientDto })
  async signupClient(@Body() userData: ClientDto): Promise<ClientModel> {
    try {
      userData.dni = userData.dni.toUpperCase();
      userData.email = userData.email.toUpperCase();
      return await this.clientService.createClient(userData);
    } catch (error) {
      switch (error) {
        case ClientCreationError.ClientAlreadySignedUp:
          throw new ConflictException('Client already signed up');
        default:
          throw error;
      }
    }
  }

  @Put('update/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ClientDto })
  @ApiBearerAuth()
  async updateClient(
    @Param('id') id: string,
    @Body() clientData: UpdateClientDto,
  ): Promise<ClientModel> {
    try {
      if (EMAIL_REGEXP.test(id.toUpperCase())) {
        return await this.clientService.updateClientByEmail({
          email: id.toUpperCase(),
          data: clientData,
        });
      }
      return await this.clientService.updateClientByDni({
        dni: id.toUpperCase(),
        data: clientData,
      });
    } catch (error) {
      switch (error) {
        case ClientUpdateError.ClientDoesntExist:
          throw new NotFoundException('Client not found');
        default:
          throw error;
      }
    }
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ClientDto })
  @ApiBearerAuth()
  async deleteClientAccount(@Param('id') id: string): Promise<ClientModel> {
    try {
      if (EMAIL_REGEXP.test(id.toUpperCase())) {
        return await this.clientService.deleteClientByEmail(id.toUpperCase());
      }
      return await this.clientService.deleteClientByDni(id.toUpperCase());
    } catch (error) {
      throw new NotFoundException('Client not found');
    }
  }
}
