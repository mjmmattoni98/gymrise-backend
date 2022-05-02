import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractResolver } from './contract.resolver';
import { ContractController } from './contract.controller';
import { PrismaService } from 'src/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { PersonalTrainerService } from '../personal-trainer/personal-trainer.service';

@Module({
  controllers: [ContractController],
  providers: [
    ContractService,
    ContractResolver,
    PrismaService,
    NotificationsService,
    PersonalTrainerService,
  ],
  exports: [ContractService],
})
export class ContractModule {}
