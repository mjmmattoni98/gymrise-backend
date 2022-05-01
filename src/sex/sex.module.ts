import { Module } from '@nestjs/common';
import { SexController } from './sex.controller';

@Module({
  providers: [],
  controllers: [SexController],
  exports: [],
})
export class SexModule {}
