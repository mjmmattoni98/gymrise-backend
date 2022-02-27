import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractResolver } from './contract.resolver';

@Module({
  providers: [ContractService, ContractResolver],
})
export class ContractModule {}
