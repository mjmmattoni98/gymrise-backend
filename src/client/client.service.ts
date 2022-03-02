import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { client, Prisma } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async client(
    clientWhereUniqueInput: Prisma.clientWhereUniqueInput,
  ): Promise<client | null> {
    return this.prisma.client.findUnique({
      where: clientWhereUniqueInput,
    });
  }

  async clients(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.clientWhereUniqueInput;
    where?: Prisma.clientWhereInput;
    orderBy?: Prisma.clientOrderByWithRelationInput;
  }): Promise<client[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.client.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createClient(data: Prisma.clientCreateInput): Promise<client> {
    return this.prisma.client.create({
      data,
    });
  }

  async updateClient(params: {
    where: Prisma.clientWhereUniqueInput;
    data: Prisma.clientUpdateInput;
  }): Promise<client> {
    const { where, data } = params;
    return this.prisma.client.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.clientWhereUniqueInput): Promise<client> {
    return this.prisma.client.delete({
      where,
    });
  }

  async findOne(where: Prisma.clientWhereUniqueInput) {
    return this.prisma.client.findUnique({where});
  }
}
