import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../users/roles/role.enum';
import { Roles } from '../users/roles/roles.decorator';
import { RolesGuard } from '../users/roles/roles.guard';
import { ChatService } from './chat.service';
import { ChatInfo } from './entity/chat-info.entity';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('trainer/:dni')
  @UseGuards(RolesGuard)
  @Roles(Role.PERSONAL_TRAINER)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [ChatInfo] })
  @ApiBearerAuth()
  async getChatsClient(@Param('dni') dni: string): Promise<ChatInfo[]> {
    try {
      return await this.chatService.getChatsTrainer(dni.toUpperCase());
    } catch (error) {
      throw new NotFoundException(`No chats found for trainer ${dni}`);
    }
  }

  @Get('client/:dni')
  @UseGuards(RolesGuard)
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: [ChatInfo] })
  @ApiBearerAuth()
  async getChatsTrainer(@Param('dni') dni: string): Promise<ChatInfo[]> {
    try {
      return await this.chatService.getChatsClient(dni.toUpperCase());
    } catch (error) {
      throw new NotFoundException(`No chats found for client ${dni}`);
    }
  }
}
