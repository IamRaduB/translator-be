import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRoles } from '../../user/entities/role';

export class BaseUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserDto extends BaseUserDto {
  role: UserRoles;
}
