import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { training_session, Prisma, personal_trainer } from "@prisma/client";

@Injectable()
export class TrainingSessionService {
  constructor(private prisma: PrismaService) {}

  async createSession(
    data: Prisma.training_sessionCreateInput,
  ): Promise<training_session> {
    return this.prisma.training_session.create({ data });
  }

  async deleteTrainingSession(id: number): Promise<training_session> {
    return this.prisma.training_session.delete({ where: { id: id } });
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
}
