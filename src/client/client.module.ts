import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientResolver } from './client.resolver';
import { PrismaService } from "../prisma.service";
import { PersonalTrainerController } from "../personal-trainer/personal-trainer.controller";
import { ClientController } from "./client.controller";

@Module({
  //controllers: [ClientController],
  providers: [ClientService, ClientResolver, PrismaService],
})
export class ClientModule {}
