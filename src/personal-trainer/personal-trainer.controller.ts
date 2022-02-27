import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { PersonalTrainerService } from './personal-trainer.service';
import { personal_trainer as PersonalTrainerModel } from '@prisma/client';

@Controller('personal-trainer')
export class PersonalTrainerController {
  constructor(
    private readonly personalTrainerService: PersonalTrainerService,
  ) {}

  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PersonalTrainerModel> {
    return this.personalTrainerService.personalTrainer({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PersonalTrainerModel[]> {
    return this.personalTrainerService.personalTrainers({
      where: { published: true },
    });
  }

  @Get('filtered-posts/:searchString')
  async getFilteredPosts(
    @Param('searchString') searchString: string,
  ): Promise<PersonalTrainerModel[]> {
    return this.personalTrainerService.personalTrainers({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('post')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PersonalTrainerModel> {
    const { title, content, authorEmail } = postData;
    return this.personalTrainerService.createPersonalTrainer({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put('publish/:id')
  async publishPost(@Param('id') id: string): Promise<PersonalTrainerModel> {
    return this.personalTrainerService.updatePersonalTrainer({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<PersonalTrainerModel> {
    return this.personalTrainerService.deletePersonalTrainer({ id: Number(id) });
  }
}
