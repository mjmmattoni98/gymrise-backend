import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { personal_trainer, Prisma } from '@prisma/client';
import { ClientCreationError } from "../client/client.service";

export enum PersonalTrainerCreationError {
  PersonalTrainerAlreadySignedUp
}

@Injectable()
export class PersonalTrainerService {
  constructor(private prisma: PrismaService) {}

  async personalTrainer(
    postWhereUniqueInput: Prisma.personal_trainerWhereUniqueInput,
  ): Promise<personal_trainer | null> {
    return this.prisma.personal_trainer.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async personalTrainers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.personal_trainerWhereUniqueInput;
    where?: Prisma.personal_trainerWhereInput;
    orderBy?: Prisma.personal_trainerOrderByWithRelationInput;
  }): Promise<personal_trainer[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.personal_trainer.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPersonalTrainer(data: Prisma.personal_trainerCreateInput): Promise<personal_trainer> {
    const foundPersonalTrainer = await this.prisma.personal_trainer.findUnique({ where: {dni: data.dni} });
    if (foundPersonalTrainer != null) {
      throw PersonalTrainerCreationError.PersonalTrainerAlreadySignedUp;
    }
    return this.prisma.personal_trainer.create({ data });
  }

  async updatePersonalTrainer(params: {
    dni: string;
    data: Prisma.personal_trainerUpdateInput;
  }): Promise<personal_trainer> {
    const { data, dni } = params;
    return this.prisma.personal_trainer.update({
      data: data,
      where: {dni: dni},
    });
  }

  async deletePersonalTrainer(
    dni: string,
  ): Promise<personal_trainer> {
    return this.prisma.personal_trainer.delete({ where : {dni: dni} });
  }

  async getPersonalTrainer(
    dni: string,
  ): Promise<personal_trainer> {
    //console.log(where)
    return this.prisma.personal_trainer.findUnique({ where:{dni: dni}});
  }
}
