import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { PrismaService } from '../prisma.service';
import { LoginDto } from './dto/login.dto';
import { Auth } from './entity/auth.entity';

export enum UserLoginError {
  ClientAlreadyLogin,
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
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
      accessToken: this.jwtService.sign({ userId: user.email }),
    };
  }

  async validateUser({ email, password }: LoginDto): Promise<any> {
    const user = await this.prisma.client.findUnique({
      where: { email: email },
    });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
