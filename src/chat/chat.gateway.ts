import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('chat-server')
  async listenForMessages(@MessageBody() data: ChatDto): Promise<void> {
    const message = await this.chatService.saveMessage(
      data.dni_client,
      data.dni_trainer,
      data.text,
    );
    this.server.sockets.emit('chat-client', message);
  }

  @SubscribeMessage('request-all-messages')
  async requestAllMessages(@MessageBody() data: ChatDto): Promise<void> {
    const messages = await this.chatService.getMessages(
      data.dni_client,
      data.dni_trainer,
    );
    this.server.sockets.emit('chat-client', messages);
  }
}
