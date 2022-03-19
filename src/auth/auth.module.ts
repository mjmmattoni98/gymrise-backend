import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ClientModule } from 'src/client/client.module';
import { LocalStrategy } from './local.strategy';
import { PrismaService } from '../prisma.service';
import { ClientService } from '../client/client.service';
import { PersonalTrainerService } from '../personal-trainer/personal-trainer.service';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
@Module({
  imports: [
    ClientModule,
    PassportModule,
    JwtModule.register({
      secret: configService.get<string>('JWT_SECRET'),
      // secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    PrismaService,
    ClientService,
    PersonalTrainerService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
