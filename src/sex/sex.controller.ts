import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { sex } from '@prisma/client';

@Controller('sex')
@ApiTags('sex')
export class SexController {
  @Get()
  async getSexes(): Promise<string[]> {
    const sexes: string[] = [];
    for (const s in sex) {
      sexes.push(s);
    }
    return sexes;
  }
}
