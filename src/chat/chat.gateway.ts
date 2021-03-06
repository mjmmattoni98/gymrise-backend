import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { ChatDto } from './dto/chat.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  logger = new Logger('ChatGateway');

  constructor(private readonly chatService: ChatService) {}

  afterInit(server: Server) {
    this.logger.log('ChatGateway initialized');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('chat-server')
  async listenForMessages(@MessageBody() data: ChatDto): Promise<void> {
    this.logger.log(
      `New message between ${data.dni_client} and ${data.dni_trainer} with data:\n${data.text}`,
    );
    try {
      const message = await this.chatService.saveMessage(
        data.dni_client,
        data.dni_trainer,
        data.date_time,
        data.text,
        data.sender,
      );
      this.server.emit(
        `chat-client/${data.dni_trainer}/${data.dni_client}`,
        message,
      );
      this.logger.log(`Message sent with data:\n${JSON.stringify(message)}`);
    } catch (e) {
      this.logger.log(`Error sending message:\n${e}`);
    }
  }

  @SubscribeMessage('request-all-messages')
  async requestAllMessages(@MessageBody() data: ChatDto): Promise<void> {
    const messages = await this.chatService.getMessages(
      data.dni_client,
      data.dni_trainer,
    );
    this.server.emit(
      `chat-client/${data.dni_trainer}/${data.dni_client}`,
      messages,
    );
  }
}
