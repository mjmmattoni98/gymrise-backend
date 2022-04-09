import { Role } from '../roles/role.enum';

export class User {
  email: string;
  dni: string;
  password: string;
  role: Role;
}
