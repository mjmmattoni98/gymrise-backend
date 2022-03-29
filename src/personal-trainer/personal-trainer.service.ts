import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  personal_trainer as PersonalTrainerModel,
  Prisma,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

export enum PersonalTrainerCreationError {
  PersonalTrainerAlreadySignedUp,
}

export enum PersonalTrainerUpdateError {
  PersonalTrainerDoesntExist,
}

@Injectable()
export class PersonalTrainerService {
  constructor(private prisma: PrismaService) {}

  async getPersonalTrainer(dni: string): Promise<PersonalTrainerModel> {
    return this.prisma.personal_trainer.findUnique({ where: { dni: dni } });
  }

  async getPersonalTrainers(): Promise<PersonalTrainerModel[]> {
    return this.prisma.personal_trainer.findMany();
  }

  async createPersonalTrainer(
    data: Prisma.personal_trainerCreateInput,
  ): Promise<PersonalTrainerModel> {
    const foundPersonalTrainer = await this.prisma.personal_trainer.findUnique({
      where: { dni: data.dni },
    });
    if (foundPersonalTrainer) {
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
  }): Promise<PersonalTrainerModel> {
    const { data, dni } = params;
    const foundPersonalTrainer = await this.prisma.personal_trainer.findUnique({
      where: { dni: dni },
    });
    if (!foundPersonalTrainer) {
      throw PersonalTrainerUpdateError.PersonalTrainerDoesntExist;
    }

    return this.prisma.personal_trainer.update({
      data: data,
      where: { dni: dni },
    });
  }

  async deletePersonalTrainer(dni: string): Promise<PersonalTrainerModel> {
    return this.prisma.personal_trainer.delete({ where: { dni: dni } });
  }
}
