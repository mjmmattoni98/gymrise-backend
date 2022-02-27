import { Module } from '@nestjs/common';
import { PersonalTrainerController } from './personal-trainer.controller';
import { PersonalTrainerService } from './personal-trainer.service';
import { PersonalTrainerResolver } from './personal-trainer.resolver';

@Module({
  controllers: [PersonalTrainerController],
  providers: [PersonalTrainerService, PersonalTrainerResolver],
})
export class PersonalTrainerModule {}
