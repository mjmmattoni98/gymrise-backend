import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { training_session, Prisma } from "@prisma/client";

@Injectable()
export class TrainingSessionService {
  constructor(private prisma: PrismaService) {}

  async createSession(data: Prisma.training_sessionCreateInput): Promise<training_session> {
    return this.prisma.training_session.create({ data });
  }
}
