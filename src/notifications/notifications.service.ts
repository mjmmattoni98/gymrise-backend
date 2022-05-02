import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { notifications as NotificationModel } from '@prisma/client';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async getNotificationsClient(dni: string): Promise<NotificationModel[]> {
    return this.prisma.notifications.findMany({
      where: {
        dni,
      },
    });
  }

  async createNotificationClient(
    dni: string,
    text: string,
  ): Promise<NotificationModel> {
    return this.prisma.notifications.create({
      data: {
        text,
        date_time: new Date(),
        client: {
          connect: {
            dni,
          },
        },
      },
    });
  }

  async deleteNotificationClient(id: number, dni: string) {
    return this.prisma.notifications.deleteMany({
      where: {
        dni,
        id,
      },
    });
  }

  async deleteAllNotificationsClient(dni: string) {
    return this.prisma.notifications.deleteMany({
      where: {
        dni,
      },
    });
  }
}
