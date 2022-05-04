import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { chat as ChatModel } from '@prisma/client';
import { ChatInfo } from './entity/chat-info.entity';
import { Chat } from './entity/chat.entity';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async saveMessage(
    dni_client: string,
    dni_trainer: string,
    date_time: Date,
    text: string,
  ): Promise<Chat> {
    const message = await this.prisma.chat.create({
      data: {
        date_time: date_time,
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
      include: {
        client: true,
        personal_trainer: true,
      },
    });

    const messageInfo: Chat = new Chat();
    messageInfo.dni_client = message.client.dni;
    messageInfo.dni_trainer = message.personal_trainer.dni;
    messageInfo.date_time = message.date_time;
    messageInfo.text = message.text;
    messageInfo.name_client = message.client.name;
    messageInfo.surname_client = message.client.surname;
    messageInfo.name_trainer = message.personal_trainer.name;
    messageInfo.surname_trainer = message.personal_trainer.surname;

    return messageInfo;
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

  async getChatsClient(dni_client: string): Promise<ChatInfo[]> {
    const chats = await this.prisma.chat.findMany({
      where: {
        dni_client,
      },
      include: {
        personal_trainer: true,
      },
    });

    const chatsInfo: ChatInfo[] = [];
    for (const chat of chats) {
      const chatInfo = new ChatInfo();
      chatInfo.dni = chat.dni_trainer;
      chatInfo.name = chat.personal_trainer.name;
      chatInfo.surname = chat.personal_trainer.surname;
      chatsInfo.push(chatInfo);
    }

    return chatsInfo;
  }

  async getChatsTrainer(dni_trainer: string): Promise<ChatInfo[]> {
    const chats = await this.prisma.chat.findMany({
      where: {
        dni_trainer,
      },
      include: {
        client: true,
      },
    });

    const chatsInfo: ChatInfo[] = [];
    for (const chat of chats) {
      const chatInfo = new ChatInfo();
      chatInfo.dni = chat.dni_client;
      chatInfo.name = chat.client.name;
      chatInfo.surname = chat.client.surname;
      chatsInfo.push(chatInfo);
    }

    return chatsInfo;
  }
}
