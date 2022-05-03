import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  training_session as TrainingSessionModel,
  training_session_client as TrainingSessionClientModel,
  personal_trainer as PersonalTrainerModel,
  Prisma,
} from '@prisma/client';
import { TrainingSessionInfo } from './entity/training-session-info.entity';

export enum TrainingSessionUpdateError {
  TrainingSessionDoesntExist,
}

const logger = new Logger('TrainingSessionController');
@Injectable()
export class TrainingSessionService {
  logger: Logger = new Logger('TrainingSessionService');

  constructor(private prisma: PrismaService) {}

  async getTrainingSessionById(id: number): Promise<TrainingSessionModel> {
    return this.prisma.training_session.findUnique({ where: { id: id } });
  }

  async getTrainingSessions(): Promise<TrainingSessionModel[]> {
    this.logger.log('Service: getTrainingSessions');
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
  ): Promise<TrainingSessionInfo[]> {
    const sessions = await this.prisma.training_session.findMany({
      where: {
        training_session_client: {
          some: {
            client: {
              dni: dni,
            },
          },
        },
      },
    });
    logger.log(sessions);

    const sessionsInfo: TrainingSessionInfo[] = [];
    for (const session of sessions) {
      const personalTrainer: PersonalTrainerModel =
        await this.prisma.personal_trainer.findUnique({
          where: {
            dni: session.dni,
          },
        });

      const sessionInfo: TrainingSessionInfo = {
        id: session.id,
        title: session.title,
        date_time: session.date_time,
        description: session.description,
        price: session.price,
        dni: session.dni,
        name: personalTrainer.name,
        surname: personalTrainer.surname,
      };
      sessionsInfo.push(sessionInfo);
    }

    return sessionsInfo;
  }

  async getTrainingSessionsAvailableClient(
    dni: string,
  ): Promise<TrainingSessionInfo[]> {
    const sessions = await this.prisma.training_session.findMany();
    const clients = await this.prisma.training_session_client.findMany({
      where: {
        client: {
          dni: dni,
        },
      },
    });

    const sessionsAvailable = sessions.filter(
      (session) =>
        !clients.some((client) => client.id === session.id) &&
        session.date_time > new Date(),
    );

    const sessionsInfo: TrainingSessionInfo[] = [];
    for (const session of sessionsAvailable) {
      const personalTrainer: PersonalTrainerModel =
        await this.prisma.personal_trainer.findUnique({
          where: {
            dni: session.dni,
          },
        });
      const sessionInfo: TrainingSessionInfo = {
        id: session.id,
        title: session.title,
        date_time: session.date_time,
        description: session.description,
        price: session.price,
        dni: session.dni,
        name: personalTrainer.name,
        surname: personalTrainer.surname,
      };
      sessionsInfo.push(sessionInfo);
    }

    return sessionsInfo;
  }

  async getTrainingSessionsAvailableTrainerClient(
    dni_trainer: string,
    dni_client: string,
  ): Promise<TrainingSessionModel[]> {
    const sessions = await this.prisma.training_session.findMany({
      where: {
        dni: dni_trainer,
      },
    });
    const clients = await this.prisma.training_session_client.findMany({
      where: {
        client: {
          dni: dni_client,
        },
      },
    });
    return sessions.filter(
      (session) =>
        !clients.some((client) => client.id === session.id) &&
        session.date_time > new Date(),
    );
  }

  async createSession(
    data: Prisma.training_sessionCreateInput,
  ): Promise<TrainingSessionModel> {
    return this.prisma.training_session.create({
      data: data,
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

  async removeClientFromSession(params: {
    id: number;
    dni: string;
  }): Promise<TrainingSessionClientModel> {
    const { id, dni } = params;
    return this.prisma.training_session_client.delete({
      where: {
        id_dni: {
          id: id,
          dni: dni,
        },
      },
    });
  }

  async deleteTrainingSession(id: number): Promise<TrainingSessionModel> {
    return this.prisma.training_session.delete({ where: { id: id } });
  }
}
