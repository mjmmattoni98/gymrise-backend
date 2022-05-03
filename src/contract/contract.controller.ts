import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ContractDto } from './dto/contract.dto';
import { contract as ContractModel, Prisma } from '@prisma/client';
import { ContractService } from './contract.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateContractDto } from './dto/update-contract.dto';
import { Roles } from '../users/roles/roles.decorator';
import { Role } from '../users/roles/role.enum';
import { RolesGuard } from '../users/roles/roles.guard';
import { NotificationsService } from '../notifications/notifications.service';
import { PersonalTrainerService } from '../personal-trainer/personal-trainer.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { Contract } from './entity/contract.entity';
import { ContractTrainer } from './entity/contract-trainer.entity';
import { ContractClient } from './entity/contract-client.entity';

@Controller('contract')
@ApiTags('contract')
export class ContractController {
  constructor(
    private readonly contractService: ContractService,
    private readonly personalTrainerService: PersonalTrainerService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Contract })
  @ApiBearerAuth()
  async getContract(@Param('id') id: string): Promise<ContractModel> {
    try {
      return await this.contractService.getContract(Number(id));
    } catch (error) {
      throw new HttpException('Contract not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('trainer/:dni_trainer/client/:dni_client')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [Contract] })
  @ApiBearerAuth()
  async getContractsByDniTrainerClient(
    @Param('dni_trainer') dni_trainer: string,
    @Param('dni_client') dni_client: string,
  ): Promise<ContractModel[]> {
    try {
      return await this.contractService.getContractByDniClientTrainer(
        dni_trainer.toUpperCase(),
        dni_client.toUpperCase(),
      );
    } catch (error) {
      throw new Error(
        'Error while getting all contracts of trainer and client',
      );
    }
  }

  @Get('trainer/:dni')
  @UseGuards(RolesGuard)
  @Roles(Role.PERSONAL_TRAINER)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [ContractTrainer] })
  @ApiBearerAuth()
  async getContractsTrainer(
    @Param('dni') dni: string,
  ): Promise<ContractModel[]> {
    try {
      return await this.contractService.getContractsTrainer(dni.toUpperCase());
    } catch (error) {
      throw new Error('Error while getting all contracts');
    }
  }

  @Get('client/:dni')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [ContractClient] })
  @ApiBearerAuth()
  async getContractsClient(
    @Param('dni') dni: string,
  ): Promise<ContractModel[]> {
    try {
      return await this.contractService.getContractsClient(dni.toUpperCase());
    } catch (error) {
      throw new Error('Error while getting all contracts');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [Contract] })
  @ApiBearerAuth()
  async getContracts(): Promise<ContractModel[]> {
    try {
      return await this.contractService.getContracts();
    } catch (error) {
      throw new Error('Error while getting all contracts');
    }
  }

  @Post('add')
  @UseGuards(RolesGuard)
  @Roles(Role.PERSONAL_TRAINER)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Contract })
  @ApiBearerAuth()
  async addContract(
    @Body() sessionData: CreateContractDto,
  ): Promise<ContractModel> {
    try {
      const prismaSessionObject: Prisma.contractCreateInput = {
        title: sessionData.title,
        description: sessionData.description,
        price: sessionData.price,
        start_date: sessionData.start_date,
        end_date: sessionData.end_date,
        client: {
          connect: {
            dni: sessionData.dni_client.toUpperCase(),
          },
        },
        personal_trainer: {
          connect: {
            dni: sessionData.dni_trainer.toUpperCase(),
          },
        },
      };

      const personalTrainer =
        await this.personalTrainerService.getPersonalTrainerByDni(
          sessionData.dni_trainer.toUpperCase(),
        );
      await this.notificationsService.createNotificationClient(
        sessionData.dni_client.toUpperCase(),
        `Nuevo contrato creado con {${personalTrainer.name} ${personalTrainer.surname}}`,
      );

      return await this.contractService.createContract(prismaSessionObject);
    } catch (error) {
      throw new Error('Error while creating the contract');
    }
  }

  @Put('update/:id/:accepted')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Contract })
  @ApiBearerAuth()
  async updateContractClient(
    @Param('id') id: string,
    @Param('accepted') accepted: string,
  ): Promise<ContractModel> {
    try {
      return await this.contractService.updateContractClient(
        Number(id),
        accepted === 'true',
      );
    } catch (error) {
      throw new Error('Error while accepting the contract');
    }
  }

  @Put('update/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.PERSONAL_TRAINER)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Contract })
  @ApiBearerAuth()
  async updateContract(
    @Param('id') id: string,
    @Body() contractSessionData: UpdateContractDto,
  ): Promise<ContractModel> {
    try {
      return await this.contractService.updateContract({
        id: Number(id),
        data: contractSessionData,
      });
    } catch (error) {
      throw new Error('Error while updating the contract');
    }
  }

  @Delete('delete/:id')
  @UseGuards(RolesGuard)
  @Roles(Role.PERSONAL_TRAINER)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: Contract })
  @ApiBearerAuth()
  async deleteContract(@Param('id') id: string): Promise<ContractModel> {
    try {
      return await this.contractService.deleteContract(Number(id));
    } catch (error) {
      throw new Error('Error while deleting the contract');
    }
  }
}
