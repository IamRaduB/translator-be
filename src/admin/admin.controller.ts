import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { BaseUserDto, UserDto } from './dto/user.dto';
import { UserService } from '../user/user.service';
import { UserRoles } from '../user/entities/role.entity';

@Controller('admin')
export class AdminController {
  constructor(private userService: UserService) {}

  @Post()
  async registerAdmin(@Body() body: BaseUserDto) {
    const alreadyExists = await this.userService.findOneByUsername(
      body.username,
    );

    if (alreadyExists) {
      throw new UnauthorizedException('User already exists');
    }

    await this.userService.createUser(body, UserRoles.ADMIN);
  }

  @Post()
  async registerUser(@Body() body: UserDto) {
    const alreadyExists = await this.userService.findOneByUsername(
      body.username,
    );

    if (alreadyExists) {
      throw new UnauthorizedException('User already exists');
    }

    await this.userService.createUser(body, body.role);
  }
}
