import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { PrismaService } from '../prisma.service';
import { ChatController } from './chat.controller';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';

@Module({
  controllers: [ChatController],
  providers: [ChatResolver, PrismaService, AuthService],
  exports: [ChatService],
})
export class ChatModule {}
