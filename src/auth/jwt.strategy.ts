import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/dto/user.entity';
import { Role } from '../users/roles/role.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private auth: AuthService, private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // usernameField: 'email',
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: {
    email: string;
    password: string;
    role: Role;
  }): Promise<User> {
    const user = await this.auth.validateUser(payload.email);

    if (!user) {
      console.log(`No user found for email: ${payload.email}`);
      throw new UnauthorizedException(
        `No user found for email: ${payload.email}`,
      );
    }

    return user;
  }
}
