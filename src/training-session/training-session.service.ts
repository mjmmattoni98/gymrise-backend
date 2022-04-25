import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  training_session as TrainingSessionModel,
  training_session_client as TrainingSessionClientModel,
  Prisma,
} from '@prisma/client';

export enum TrainingSessionUpdateError {
  TrainingSessionDoesntExist,
}

@Injectable()
export class TrainingSessionService {
  constructor(private prisma: PrismaService) {}

  async getTrainingSessionById(id: number): Promise<TrainingSessionModel> {
    return this.prisma.training_session.findUnique({ where: { id: id } });
  }

  async getTrainingSessionByDate(date: Date): Promise<TrainingSessionModel[]> {
    return this.prisma.training_session.findMany({ where: { date: date } });
  }

  async getTrainingSessions(): Promise<TrainingSessionModel[]> {
    return this.prisma.training_session.findMany();
  }

  async getTrainingSessionsForTrainer(
    dni: string,
  ): Promise<TrainingSessionModel[]> {
    return this.prisma.training_session.findMany({
      where: {
        dni: dni,
      },
    });
  }

  async getTrainingSessionsForClient(
    dni: string,
  ): Promise<TrainingSessionModel[]> {
    return this.prisma.training_session.findMany({
      where: {
        training_session_client: {
          dni: dni,
        },
      },
    });
  }

  async getTrainingSessionsAvailable(): Promise<TrainingSessionModel[]> {
    const sessions = await this.prisma.training_session.findMany();
    const currentDate = new Date();
    return sessions.filter((session) => session.date > currentDate);
  }

  async createSession(
    data: Prisma.training_sessionCreateInput,
  ): Promise<TrainingSessionModel> {
    console.log(this.prisma.training_session.create({
      data: data
    }));
    return this.prisma.training_session.create({
      data: data
    });
  }

  async addClientToSession(params: {
    id: number;
    dni: string;
  }): Promise<TrainingSessionClientModel> {
    const { id, dni } = params;
    return this.prisma.training_session_client.create({
      data: {
        training_session: {
          connect: {
            id: id,
          },
        },
        client: {
          connect: {
            dni: dni,
          },
        },
      },
    });
  }

  async updateTrainingSession(params: {
    id: number;
    data: Prisma.training_sessionUpdateInput;
  }): Promise<TrainingSessionModel> {
    const { data, id } = params;
    return this.prisma.training_session.update({
      where: { id: id },
      data: data,
    });
  }

  async deleteTrainingSession(id: number): Promise<TrainingSessionModel> {
    return this.prisma.training_session.delete({ where: { id: id } });
  }
}
