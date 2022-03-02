import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete, UseGuards
} from "@nestjs/common";
import { PersonalTrainerService } from './personal-trainer.service';
import {
  client,
  client as ClientModel,
  personal_trainer,
  personal_trainer as PersonalTrainerModel
} from "@prisma/client";
//import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller('personal-trainer')
export class PersonalTrainerController {
  constructor(
    private readonly personalTrainerService: PersonalTrainerService, private personalTrainer: personal_trainer
  ) {}

  @Post('trainer')
  //@UseGuards(JwtAuthGuard)
  async signupUser( @Body() userData: {
    name: String,
    surname: String,
    dni: String,
    password: String,
    email: string,
    description: string,

  } ): Promise<PersonalTrainerModel> {
    return this.personalTrainerService.createPersonalTrainer(this.personalTrainer);
  }
  /*@Get('post/:id')
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
  }*/
}
