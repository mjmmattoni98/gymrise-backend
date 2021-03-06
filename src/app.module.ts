import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientController } from './client/client.controller';
import { ClientModule } from './client/client.module';
import { PersonalTrainerModule } from './personal-trainer/personal-trainer.module';
import { ChatService } from './chat/chat.service';
import { ChatModule } from './chat/chat.module';
import { ContractController } from './contract/contract.controller';
import { ContractModule } from './contract/contract.module';
import { TrainingSkillModule } from './training-skill/training-skill.module';
import { TrainingSessionClientModule } from './training-session-client/training-session-client.module';
import { TrainingSessionClientService } from './training-session-client/training-session-client.service';
import { TrainingSessionClientController } from './training-session-client/training-session-client.controller';
import { TrainingSessionModule } from './training-session/training-session.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SexModule } from './sex/sex.module';
import { NotificationsModule } from './notifications/notifications.module';
import { ChatGateway } from './chat/chat.gateway';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ClientModule,
    PersonalTrainerModule,
    ChatModule,
    ContractModule,
    TrainingSessionModule,
    TrainingSessionClientModule,
    TrainingSkillModule,
    SexModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    NotificationsModule,
  ],
  controllers: [
    AppController,
    ClientController,
    ContractController,
    TrainingSessionClientController,
  ],
  providers: [
    AppService,
    ChatService,
    TrainingSessionClientService,
    PrismaService,
    ChatGateway,
  ],
})
export class AppModule {}
