import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { personal_trainer, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export enum PersonalTrainerCreationError {
  PersonalTrainerAlreadySignedUp,
}

@Injectable()
export class PersonalTrainerService {
  constructor(private prisma: PrismaService) {}

  async getPersonalTrainer(dni: string): Promise<personal_trainer> {
    return this.prisma.personal_trainer.findUnique({ where: { dni: dni } });
  }

  async getPersonalTrainers(): Promise<personal_trainer[]> {
    return this.prisma.personal_trainer.findMany();
  }

  async createPersonalTrainer(
    data: Prisma.personal_trainerCreateInput,
  ): Promise<personal_trainer> {
    const foundPersonalTrainer = await this.prisma.personal_trainer.findUnique({
      where: { dni: data.dni },
    });
    if (foundPersonalTrainer != null) {
      throw PersonalTrainerCreationError.PersonalTrainerAlreadySignedUp;
    }

    // * Encrypt password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);
    data.password = hashedPassword;

    return this.prisma.personal_trainer.create({ data });
  }

  async updatePersonalTrainer(params: {
    dni: string;
    data: Prisma.personal_trainerUpdateInput;
  }): Promise<personal_trainer> {
    const { data, dni } = params;
    return this.prisma.personal_trainer.update({
      data: data,
      where: { dni: dni },
    });
  }

  async deletePersonalTrainer(dni: string): Promise<personal_trainer> {
    return this.prisma.personal_trainer.delete({ where: { dni: dni } });
  }
}
