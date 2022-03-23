import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { client, personal_trainer } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(loginInfo: LoginDto): Promise<client | personal_trainer> {
    const user = await this.authService.validateUser(loginInfo);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
