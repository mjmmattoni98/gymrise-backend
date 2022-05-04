import { Logger, UseGuards } from '@nestjs/common';
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
  logger = new Logger('ChatGateway');

  constructor(private readonly chatService: ChatService) {}

  @SubscribeMessage('chat-server')
  async listenForMessages(@MessageBody() data: ChatDto): Promise<void> {
    this.logger.log(
      `New message between ${data.dni_client} and ${data.dni_trainer} with data:\n${data.text}`,
    );
    const message = await this.chatService.saveMessage(
      data.dni_client,
      data.dni_trainer,
      data.date_time,
      data.text,
    );
    this.server.sockets.emit('chat-client', message);
    this.logger.log(`Message sent with data:\n${JSON.stringify(message)}`);
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
