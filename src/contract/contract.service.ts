import { Injectable } from '@nestjs/common';
import { contract as ContractModel, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ContractService {
  constructor(private prisma: PrismaService) {}

  async getContract(id: number): Promise<ContractModel> {
    return this.prisma.contract.findUnique({ where: { id: id } });
  }

  async getContractsTrainer(dni: string): Promise<ContractModel[]> {
    return this.prisma.contract.findMany({
      where: { dni_trainer: dni },
    });
  }

  async getContractsClient(dni: string): Promise<ContractModel[]> {
    return this.prisma.contract.findMany({
      where: { dni_client: dni },
    });
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
