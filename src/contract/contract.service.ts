import { Injectable } from '@nestjs/common';
import { contract as ContractModel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { ContractClient } from './entity/contract-client.entity';
import { ContractTrainer } from './entity/contract-trainer.entity';

@Injectable()
export class ContractService {
  constructor(private prisma: PrismaService) {}

  async getContract(id: number): Promise<ContractModel> {
    return this.prisma.contract.findUnique({ where: { id: id } });
  }

  async getContractsTrainer(dni: string): Promise<ContractTrainer[]> {
    const contracts = await this.prisma.contract.findMany({
      where: { dni_trainer: dni },
    });

    const contractsTrainer: ContractTrainer[] = [];
    for (const contract of contracts) {
      const client = await this.prisma.client.findUnique({
        where: { dni: contract.dni_client },
      });

      const contractTrainer: ContractTrainer = {
        ...contract,
        name_client: client.name,
        surname_client: client.surname,
      };

      contractsTrainer.push(contractTrainer);
    }

    return contractsTrainer;
  }

  async getContractsClient(dni: string): Promise<ContractClient[]> {
    const contracts = await this.prisma.contract.findMany({
      where: { dni_client: dni },
    });

    const contractsClient: ContractClient[] = [];
    for (const contract of contracts) {
      const client = await this.prisma.client.findUnique({
        where: { dni: contract.dni_client },
      });

      const contractClient: ContractClient = {
        ...contract,
        name_trainer: client.name,
        surname_trainer: client.surname,
      };

      contractsClient.push(contractClient);
    }

    return contractsClient;
  }

  async getContractByDniClientTrainer(
    dni_trainer: string,
    dni_client: string,
  ): Promise<ContractModel[]> {
    return this.prisma.contract.findMany({
      where: { dni_client: dni_client, dni_trainer: dni_trainer },
    });
  }

  async getContracts(): Promise<ContractModel[]> {
    return this.prisma.contract.findMany();
  }

  async createContract(
    data: Prisma.contractCreateInput,
  ): Promise<ContractModel> {
    return this.prisma.contract.create({ data });
  }

  async updateContractClient(
    id: number,
    accepted: boolean,
  ): Promise<ContractModel> {
    return this.prisma.contract.update({
      where: { id: id },
      data: {
        accepted: accepted,
      },
    });
  }

  async updateContract(params: {
    id: number;
    data: Prisma.contractUpdateInput;
  }): Promise<ContractModel> {
    const { data, id } = params;

    return this.prisma.contract.update({
      where: { id: id },
      data: data,
    });
  }

  async deleteContract(id: number): Promise<ContractModel> {
    return this.prisma.contract.delete({ where: { id: id } });
  }
}
