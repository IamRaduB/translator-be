import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get('login')
  @Render('login')
  loginPage() {
    return {
      page: 'login',
    };
  }
}
