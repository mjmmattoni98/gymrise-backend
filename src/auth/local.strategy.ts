import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  client as ClientModel,
  personal_trainer as PersonalTrainerModel,
} from '@prisma/client';
import { User } from '../users/dto/user.entity';
import { Role } from '../users/roles/role.enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(payload: { loginInfo: string }): Promise<User> {
    const user = await this.authService.validateUser(
      payload.loginInfo,
      '',
      Role.CLIENT,
    );

    if (!user) {
      throw new UnauthorizedException(
        `No user found for email: ${payload.loginInfo}`,
      );
    }

    return user;
  }
}
