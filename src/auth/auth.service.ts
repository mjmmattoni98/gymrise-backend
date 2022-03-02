import { Auth } from './entity/auth.entity';
import { PrismaService } from '../prisma.service';
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
  constructor(
    private prisma: PrismaService,
    private clientService: ClientService,
    private jwtService: JwtService,
  ) {}

  async login(dni: string, password: string): Promise<Auth> {
    const user = await this.prisma.client.findUnique({
      where: { dni: dni },
    });

    if (!user) {
      throw new NotFoundException(`No user found for email: ${dni}`);
    }

    // TODO use a library like bcrypt to hash and compare your passwords (Ya está agregada bcrypt al package.json)
    // https://github.com/kelektiv/node.bcrypt.js#readme
    const passwordValid = user.password === password;

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.dni }),
    };
  }

  async loginUser(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  validateUserJwt(dni: string) {
    return this.prisma.client.findUnique({ where: { dni: dni } });
  }

  async validateUser(
    username: Prisma.clientWhereUniqueInput,
    pass: string,
  ): Promise<any> {
    const user = await this.clientService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
