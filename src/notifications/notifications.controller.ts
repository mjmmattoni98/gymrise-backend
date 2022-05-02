import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../users/roles/role.enum';
import { Roles } from '../users/roles/roles.decorator';
import { RolesGuard } from '../users/roles/roles.guard';
import { NotificationsService } from './notifications.service';
import { notifications as NotificationModel } from '@prisma/client';
import { Notifications } from './entity/notifications.entity';

@Controller('notifications')
@ApiTags('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('client/:dni')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [Notifications] })
  @ApiBearerAuth()
  async getAllNotificationsClient(
    @Param('dni') dni: string,
  ): Promise<NotificationModel[]> {
    try {
      return await this.notificationsService.getNotificationsClient(
        dni.toUpperCase(),
      );
    } catch (error) {
      throw new Error('Error while getting all the notifications of a client');
    }
  }

  @Delete('delete/:dni')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteAllNotificationsClient(@Param('dni') dni: string) {
    try {
      return await this.notificationsService.deleteAllNotificationsClient(
        dni.toUpperCase(),
      );
    } catch (error) {
      throw new Error('Error while deleting all the notifications of a client');
    }
  }

  @Delete('delete/:id/client/:dni')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async deleteNotificationClient(
    @Param('id') id: string,
    @Param('dni') dni: string,
  ) {
    try {
      return await this.notificationsService.deleteNotificationClient(
        Number(id),
        dni.toUpperCase(),
      );
    } catch (error) {
      throw new Error('Error while deleting the notification of a client');
    }
  }
}
