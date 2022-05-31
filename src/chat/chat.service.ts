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

  async getMessages(dni_client: string, dni_trainer: string): Promise<Chat[]> {
    const chats = await this.prisma.chat.findMany({
      where: {
        dni_client,
        dni_trainer,
      },
      include: {
        client: true,
        personal_trainer: true,
      },
    });

    const chatsInfo: Chat[] = [];
    for (const chat of chats) {
      const chatInfo = new Chat();
      chatInfo.dni_client = chat.dni_client;
      chatInfo.name_client = chat.client.name;
      chatInfo.surname_client = chat.client.surname;
      chatInfo.dni_trainer = chat.dni_trainer;
      chatInfo.name_trainer = chat.personal_trainer.name;
      chatInfo.surname_trainer = chat.personal_trainer.surname;
      chatInfo.date_time = chat.date_time;
      chatInfo.text = chat.text;
      chatsInfo.push(chatInfo);
    }

    return chatsInfo;
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
    const trainers: string[] = [];
    for (const chat of chats) {
      if (!trainers.includes(chat.dni_trainer)) {
        const chatInfo = new ChatInfo();
        chatInfo.dni = chat.dni_trainer;
        chatInfo.name = chat.personal_trainer.name;
        chatInfo.surname = chat.personal_trainer.surname;
        chatsInfo.push(chatInfo);
        trainers.push(chat.dni_trainer);
      }
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
    const clients: string[] = [];
    for (const chat of chats) {
      if (!clients.includes(chat.dni_client)) {
        const chatInfo = new ChatInfo();
        chatInfo.dni = chat.dni_client;
        chatInfo.name = chat.client.name;
        chatInfo.surname = chat.client.surname;
        chatsInfo.push(chatInfo);
        clients.push(chat.dni_client);
      }
    }

    return chatsInfo;
  }

  async existMessage(dni_trainer: string, dni_client: string, date_time: Date) {
    const message = await this.prisma.chat.findUnique({
      where: {
        dni_trainer_dni_client_date_time: {
          dni_trainer,
          dni_client,
          date_time,
        },
      },
    });

    return message !== null;
  }
}
