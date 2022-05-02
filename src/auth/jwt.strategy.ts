import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';
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
    return this.auth.validateUser(
      payload.email,
      payload.password,
      payload.role,
    );
  }
}
