import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { client, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export enum ClientCreationError {
  ClientAlreadySignedUp,
}

export enum ClientUpdateError {
  ClientDoesntExist,
}

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async getClientByDni(dni: string): Promise<client> {
    return this.prisma.client.findUnique({ where: { dni: dni } });
  }

  async getClientByEmail(email: string): Promise<client> {
    return this.prisma.client.findUnique({ where: { email: email } });
  }

  async getClients(): Promise<client[]> {
    return this.prisma.client.findMany();
  }

  async createClient(data: Prisma.clientCreateInput): Promise<client> {
    const foundClient = await this.prisma.client.findUnique({
      where: { dni: data.dni },
    });
    if (foundClient) {
      throw ClientCreationError.ClientAlreadySignedUp;
    }

    // * Encrypt password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;

    return this.prisma.client.create({ data });
  }

  async updateClient(params: {
    dni: string;
    data: Prisma.clientUpdateInput;
  }): Promise<client> {
    const { data, dni } = params;

    const foundClient = await this.prisma.client.findUnique({
      where: { dni: dni },
    });
    if (!foundClient) {
      throw ClientUpdateError.ClientDoesntExist;
    }

    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(data.password as string, salt);
    // data.password = hashedPassword;

    return this.prisma.client.update({
      where: { dni: dni },
      data: data,
    });
  }

  async deleteClient(dni: string): Promise<client> {
    return this.prisma.client.delete({ where: { dni: dni } });
  }
}
