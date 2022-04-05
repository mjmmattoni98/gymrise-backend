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
import {
  client as ClientModel,
  personal_trainer as PersonalTrainerModel,
} from '@prisma/client';
import { Role } from '../users/roles/role.enum';
import { UserDto } from '../users/dto/user.dto';

export enum UserLoginError {
  ClientAlreadyLogin,
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async loginJwt({ email, password }: LoginDto): Promise<Auth> {
    const user = await this.usersService.getUser(email);

    if (!user) {
      throw new NotFoundException(`No user found for email: ${email}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({
        userId: user.email,
        role: user.role,
      }),
    };
  }

  async validateUser(email: string): Promise<UserDto> {
    return this.usersService.getUser(email);
  }
}
