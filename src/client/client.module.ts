import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientResolver } from './client.resolver';
import { PrismaService } from "../prisma.service";

@Module({
  providers: [ClientService, ClientResolver, PrismaService],
})
export class ClientModule {}
