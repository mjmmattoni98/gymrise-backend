import { Module } from '@nestjs/common';
import { TrainingSkillService } from './training-skill.service';
import { TrainingSkillController } from './training-skill.controller';
import { TrainingSkillResolver } from './training-skill.resolver';

@Module({
  providers: [TrainingSkillService, TrainingSkillResolver],
  controllers: [TrainingSkillController],
})
export class TrainingSkillModule {}
