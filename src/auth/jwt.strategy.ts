import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import {
  client as ClientModel,
  personal_trainer as PersonalTrainerModel,
} from '@prisma/client';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(
    loginInfo: LoginDto,
  ): Promise<ClientModel | PersonalTrainerModel> {
    const user = await this.auth.validateUser(loginInfo);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
