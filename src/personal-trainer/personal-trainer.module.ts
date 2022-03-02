import { Module } from '@nestjs/common';
import { PersonalTrainerController } from './personal-trainer.controller';
import { PersonalTrainerService } from './personal-trainer.service';
import { PersonalTrainerResolver } from './personal-trainer.resolver';
import { PrismaService } from "../prisma.service";

@Module({
  //controllers: [PersonalTrainerController],
  providers: [PersonalTrainerService, PersonalTrainerResolver, PrismaService],
})
export class PersonalTrainerModule {}
