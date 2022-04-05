import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/user.dto';
import { Role } from './roles/role.enum';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUser(email: string): Promise<UserDto> {
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
        password: (await trainer).password,
        role: Role.PERSONAL_TRAINER,
      };
    }
    return {
      email: client.email,
      password: client.password,
      role: Role.PERSONAL_TRAINER,
    };
  }
}
