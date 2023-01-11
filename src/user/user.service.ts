import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BaseUserDto, UserDto } from '../admin/dto/user.dto';
import { RoleEntity, UserRoles } from './entities/role.entity';

@Injectable()
export class UserService {
  log: Logger = new Logger('UserService');
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(User) private roleRepository: Repository<RoleEntity>,
  ) {}
  findOneByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        username,
      },
      relations: ['role'],
    });
  }

  async createUser(userData: BaseUserDto, role?: UserRoles) {
    const dbRole = await this.roleRepository.findOne({
      where: {
        name: role ?? UserRoles.EDITOR,
      },
    });

    if (!dbRole) {
      this.log.error(
        `Unable to retrieve role ${
          role ?? UserRoles.EDITOR
        }. Did you seed the database?`,
      );
      throw new InternalServerErrorException('Unable to query user roles');
    }

    const user = new User();
    user.email = userData.email;
    user.username = userData.username;
    user.password = userData.password;

    user.role = dbRole;

    return this.userRepository.create(user);
  }
}
