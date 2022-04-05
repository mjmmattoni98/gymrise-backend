import { Role } from '../roles/role.enum';

export class UserDto {
  email: string;
  password: string;
  role: Role;
}
