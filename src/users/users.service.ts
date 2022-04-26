import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User } from './dto/user.entity';
import { Role } from './roles/role.enum';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(email: string, role: Role): Promise<User> {
    if (role === Role.CLIENT) {
      const client = await this.prisma.client.findUnique({
        where: { email: email },
      });
      if (client) {
        return {
          email: client.email,
          dni: client.dni,
          password: client.password,
          role: Role.CLIENT,
          name: client.name,
        };
      }
    } else if (role === Role.PERSONAL_TRAINER) {
      const trainer = this.prisma.personal_trainer.findUnique({
        where: { email: email },
      });
      if (trainer) {
        return {
          email: (await trainer).email,
          dni: (await trainer).dni,
          password: (await trainer).password,
          role: Role.PERSONAL_TRAINER,
          name: (await trainer).name,
        };
      }
    }
    return null;
  }
}
