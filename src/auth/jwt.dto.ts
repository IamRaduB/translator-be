import { UserRoles } from '../user/entities/role.entity';

export interface JwtDto {
  sub: number;
  username: string;
  email: string;
  role: UserRoles;
}

export interface JwtUser {
  id: number;
  username: string;
  email: string;
  role: UserRoles;
}
