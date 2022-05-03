import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { chat as ChatModel } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async saveMessage(
    dni_client: string,
    dni_trainer: string,
    text: string,
  ): Promise<ChatModel> {
    return this.prisma.chat.create({
      data: {
        date_time: new Date(),
        text: text,
        client: {
          connect: {
            dni: dni_client,
          },
        },
        personal_trainer: {
          connect: {
            dni: dni_trainer,
          },
        },
      },
    });
  }

  async getMessages(
    dni_client: string,
    dni_trainer: string,
  ): Promise<ChatModel[]> {
    return this.prisma.chat.findMany({
      where: {
        dni_client,
        dni_trainer,
      },
    });
  }
}
