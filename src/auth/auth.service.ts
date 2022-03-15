import { Auth } from './entity/auth.entity';
import { PrismaService } from '../prisma.service';
import bcrypt from 'bcrypt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientService } from 'src/client/client.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  saltRound = 10;

  constructor(
    private prisma: PrismaService,
    private clientService: ClientService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<Auth> {
    const user = await this.prisma.client.findUnique({
      where: { dni: email },
    });

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

  async loginUser(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  validateUserJwt(email: string) {
    return this.prisma.client.findUnique({ where: { dni: email } });
  }

  async validateUser(
    username: Prisma.clientWhereUniqueInput,
    pass: string,
  ): Promise<any> {
    const user = await this.clientService.client(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
