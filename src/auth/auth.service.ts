import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { Auth } from './entity/auth.entity';
import { User } from '../users/dto/user.entity';
import { Role } from '../users/roles/role.enum';

export enum UserLoginError {
  ClientAlreadyLogin,
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async loginJwt({ email, password, role }: LoginDto): Promise<Auth> {
    const user = await this.usersService.getUser(email.toLowerCase(), role);

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({
        email: user.email,
        dni: user.dni,
        password: user.password,
        role: user.role,
      }),
      dni: user.dni,
      name: user.name,
    };
  }

  async validateUser(
    email: string,
    password: string,
    role: Role,
  ): Promise<User> {
    const user = await this.usersService.getUser(email.toLowerCase(), role);

    if (!user) {
      throw new UnauthorizedException(`No user found for email: ${email}`);
    }

    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      throw new UnauthorizedException(`Invalid password for email: ${email}`);
    }

    return user;
  }
}
