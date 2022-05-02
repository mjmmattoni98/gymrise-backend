import { UseGuards } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../users/roles/role.enum';
import { Roles } from '../users/roles/roles.decorator';

@WebSocketGateway()
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('send_message')
  @Roles(Role.CLIENT)
  @UseGuards(JwtAuthGuard)
  listenForMessages(@MessageBody() data: string) {
    this.server.sockets.emit('receive_message', data);
  }
}
