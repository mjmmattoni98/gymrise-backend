import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  personal_trainer as PersonalTrainerModel,
  Prisma,
  skill,
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

  async getPersonalTrainerByDni(dni: string): Promise<PersonalTrainerModel> {
    return this.prisma.personal_trainer.findUnique({ where: { dni: dni } });
  }

  async getPersonalTrainerByEmail(
    email: string,
  ): Promise<PersonalTrainerModel> {
    return this.prisma.personal_trainer.findUnique({ where: { email: email } });
  }

  async getSkills(): Promise<string[]> {
    let skills: string[];
    for (const s in skill) {
      skills.push(s);
    }
    return skills;
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

  async updatePersonalTrainerByDni(params: {
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
      where: { dni: dni },
      data: data,
    });
  }

  async updatePersonalTrainerByEmail(params: {
    email: string;
    data: Prisma.personal_trainerUpdateInput;
  }): Promise<PersonalTrainerModel> {
    const { data, email } = params;
    const foundPersonalTrainer = await this.prisma.personal_trainer.findUnique({
      where: { email: email },
    });
    if (!foundPersonalTrainer) {
      throw PersonalTrainerUpdateError.PersonalTrainerDoesntExist;
    }

    return this.prisma.personal_trainer.update({
      where: { email: email },
      data: data,
    });
  }

  async deletePersonalTrainerByDni(dni: string): Promise<PersonalTrainerModel> {
    return this.prisma.personal_trainer.delete({ where: { dni: dni } });
  }

  async deletePersonalTrainerByEmail(
    email: string,
  ): Promise<PersonalTrainerModel> {
    return this.prisma.personal_trainer.delete({ where: { email: email } });
  }
}
