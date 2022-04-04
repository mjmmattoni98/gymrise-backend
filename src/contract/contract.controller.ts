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

@Controller('contract')
@ApiTags('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ContractDto })
  @ApiBearerAuth()
  async getContract(@Param('id') id: string): Promise<ContractModel> {
    try {
      return await this.contractService.getContract(Number(id));
    } catch (error) {
      throw new HttpException('Contract not found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/trainer/:dni_trainer/client/:dni_client')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [ContractDto] })
  @ApiBearerAuth()
  async getContractsByDniTrainerClient(
    @Param('dni_trainer') dni_trainer: string,
    @Param('dni_client') dni_client: string,
  ): Promise<ContractModel[]> {
    try {
      return await this.contractService.getContractByDniClientTrainer(
        dni_trainer,
        dni_client,
      );
    } catch (error) {
      throw new Error(
        'Error while getting all contracts of trainer and client',
      );
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [ContractDto] })
  @ApiBearerAuth()
  async getAllContracts(): Promise<ContractModel[]> {
    try {
      return await this.contractService.getContracts();
    } catch (error) {
      throw new Error('Error while getting all contracts');
    }
  }

  @Post('add')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ContractDto })
  @ApiBearerAuth()
  async addContract(@Body() sessionData: ContractDto): Promise<ContractModel> {
    try {
      const prismaSessionObject: Prisma.contractCreateInput = {
        description: sessionData.description,
        price: sessionData.price,
        start_date: sessionData.start_date,
        end_date: sessionData.end_date,
        accepted: sessionData.accepted,
        client: {
          connect: {
            dni: sessionData.dni_client,
          },
        },
        personal_trainer: {
          connect: {
            dni: sessionData.dni_trainer,
          },
        },
      };

      return await this.contractService.createContract(prismaSessionObject);
    } catch (error) {
      throw new Error('Error while creating the contract');
    }
  }

  @Put('update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ContractDto })
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
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ContractDto })
  @ApiBearerAuth()
  async deleteContract(@Param('id') id: string): Promise<ContractModel> {
    try {
      return await this.contractService.deleteContract(Number(id));
    } catch (error) {
      throw new Error('Error while deleting the contract');
    }
  }
}
