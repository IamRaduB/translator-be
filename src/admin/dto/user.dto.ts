import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { UserRoles } from '../../user/entities/role.entity';

export class BaseUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

export class UserDto extends BaseUserDto {
  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: UserRoles;
}
