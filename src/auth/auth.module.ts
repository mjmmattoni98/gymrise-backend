import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ClientModule } from 'src/client/client.module';
import { LocalStrategy } from './local.strategy';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma.service';

const configService = new ConfigService();
@Module({
  imports: [
    ClientModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '12h' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    UsersService,
    PrismaService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
