import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BaseUserDto, UserDto } from './dto/user.dto';
import { UserService } from '../user/user.service';
import { UserRoles } from '../user/entities/role.entity';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('admin')
export class AdminController {
  constructor(private userService: UserService) {}

  @Post()
  async registerAdmin(@Body() body: BaseUserDto) {
    const alreadyExists = await this.userService.findOneByUsername(
      body.username,
    );

    if (alreadyExists) {
      throw new ForbiddenException('User already exists');
    }

    await this.userService.createUser(body, UserRoles.ADMIN);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRoles.ADMIN)
  @Post('user')
  async registerUser(@Body() body: UserDto) {
    const alreadyExists = await this.userService.findOneByUsername(
      body.username,
    );

    if (alreadyExists) {
      throw new ForbiddenException('User already exists');
    }

    await this.userService.createUser(body, body.role);
  }
}
