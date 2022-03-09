import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { client, personal_trainer, Prisma } from "@prisma/client";

export enum ClientCreationError {
  ClientAlreadySignedUp
}

export enum ClientUpdateError {
  ClientDoesntExist
}

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async client(clientWhereUniqueInput: Prisma.clientWhereUniqueInput): Promise<client | null> {
    return this.prisma.client.findUnique({ where: clientWhereUniqueInput });
  }

  async clients(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.clientWhereUniqueInput,
    where?: Prisma.clientWhereInput,
    orderBy?: Prisma.clientOrderByWithRelationInput
  }): Promise<client[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.client.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }

  async createClient(data: Prisma.clientCreateInput): Promise<client> {
    const foundClient = await this.prisma.client.findUnique({ where: {dni: data.dni} });
    if (foundClient != null) {
      throw ClientCreationError.ClientAlreadySignedUp;
    }
    return this.prisma.client.create({ data });
  }

  async updateClient(params: {
    dni: string;
    data: Prisma.clientUpdateInput;
  }): Promise<client> {
    const { data, dni } = params;
    return this.prisma.client.update({
      data: data,
      where: {dni: dni},
    });
  }

  async deleteClient(
    dni: string,
  ): Promise<client> {
    return this.prisma.client.delete({ where : {dni: dni} });
  }

  async getClient(
    dni: string,
  ): Promise<client> {
    //console.log(where)
    return this.prisma.client.findUnique({ where:{dni: dni}});
  }
/*  async updateClient(params: { where: Prisma.clientWhereUniqueInput, data: Prisma.clientUpdateInput }): Promise<client> {
    const { where, data } = params;
    const foundClient = await this.prisma.client.findUnique({ where: {dni: where.dni} });
    if (foundClient == null) {
      throw ClientUpdateError.ClientDoesntExist;
    }
    return this.prisma.client.update({ data, where });
  }

  async deleteUser(where: Prisma.clientWhereUniqueInput): Promise<client> {
    return this.prisma.client.delete({ where });
  }*/
}
