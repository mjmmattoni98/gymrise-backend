import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractResolver } from './contract.resolver';
import { ContractController } from './contract.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ContractController],
  providers: [ContractService, ContractResolver, PrismaService],
  exports: [ContractService],
})
export class ContractModule {}
