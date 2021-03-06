import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatResolver, PrismaService, ChatGateway],
  exports: [ChatService],
})
export class ChatModule {}
