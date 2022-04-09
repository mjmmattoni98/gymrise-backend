import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { client as ClientModel, Prisma } from '@prisma/client';
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

  async getClientByDni(dni: string): Promise<ClientModel> {
    return this.prisma.client.findUnique({ where: { dni: dni } });
  }

  async getClientByEmail(email: string): Promise<ClientModel> {
    return this.prisma.client.findUnique({ where: { email: email } });
  }

  async getClients(): Promise<ClientModel[]> {
    return this.prisma.client.findMany();
  }

  async createClient(data: Prisma.clientCreateInput): Promise<ClientModel> {
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

  async updateClientByDni(params: {
    dni: string;
    data: Prisma.clientUpdateInput;
  }): Promise<ClientModel> {
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

  async updateClientByEmail(params: {
    email: string;
    data: Prisma.clientUpdateInput;
  }): Promise<ClientModel> {
    const { data, email } = params;

    const foundClient = await this.prisma.client.findUnique({
      where: { email: email },
    });
    if (!foundClient) {
      throw ClientUpdateError.ClientDoesntExist;
    }

    // const salt = await bcrypt.genSalt();
    // const hashedPassword = await bcrypt.hash(data.password as string, salt);
    // data.password = hashedPassword;

    return this.prisma.client.update({
      where: { email: email },
      data: data,
    });
  }

  async deleteClientByDni(dni: string): Promise<ClientModel> {
    return this.prisma.client.delete({ where: { dni: dni } });
  }

  async deleteClientByEmail(email: string): Promise<ClientModel> {
    return this.prisma.client.delete({ where: { email: email } });
  }
}
