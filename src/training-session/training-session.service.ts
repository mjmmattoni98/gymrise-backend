import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { training_session, Prisma, personal_trainer } from '@prisma/client';

export enum TrainingSessionUpdateError {
  TrainingSessionDoesntExist,
}

@Injectable()
export class TrainingSessionService {
  constructor(private prisma: PrismaService) {}

  async getTrainingSessionById(id: number): Promise<training_session> {
    return this.prisma.training_session.findUnique({ where: { id: id } });
  }

  async getTrainingSessionByDate(date: Date): Promise<training_session[]> {
    return this.prisma.training_session.findMany({ where: { date: date } });
  }

  async getTrainingSessions(): Promise<training_session[]> {
    return this.prisma.training_session.findMany();
  }

  async createSession(
    data: Prisma.training_sessionCreateInput,
  ): Promise<training_session> {
    return this.prisma.training_session.create({ data });
  }

  async updateTrainingSession(params: {
    id: number;
    data: Prisma.training_sessionUpdateInput;
  }): Promise<training_session> {
    const { data, id } = params;
    return this.prisma.training_session.update({
      data: data,
      where: { id: id },
    });
  }

  async deleteTrainingSession(id: number): Promise<training_session> {
    return this.prisma.training_session.delete({ where: { id: id } });
  }
}
