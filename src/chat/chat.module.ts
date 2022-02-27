import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatResolver } from './chat.resolver';

@Module({
  controllers: [ChatController],
  providers: [ChatResolver],
})
export class ChatModule {}
