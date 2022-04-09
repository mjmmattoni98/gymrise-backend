import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './dto/user.entity';
import { Role } from './roles/role.enum';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(email: string): Promise<User> {
    const client = await this.prisma.client.findUnique({
      where: { email: email },
    });
    if (!client) {
      const trainer = this.prisma.personal_trainer.findUnique({
        where: { email: email },
      });
      if (!trainer) {
        return null;
      }
      return {
        email: (await trainer).email,
        dni: (await trainer).dni,
        password: (await trainer).password,
        role: Role.PERSONAL_TRAINER,
      };
    }
    return {
      email: client.email,
      dni: client.dni,
      password: client.password,
      role: Role.CLIENT,
    };
  }
}
