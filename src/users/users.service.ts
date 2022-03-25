import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {
  client as ClientModel,
  personal_trainer as PersonalTrainerModel,
} from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(email: string): Promise<ClientModel | PersonalTrainerModel> {
    const user = await this.prisma.client.findUnique({
      where: { email: email },
    });
    if (!user) {
      return this.prisma.personal_trainer.findUnique({
        where: { email: email },
      });
    }
    return user;
  }
}
