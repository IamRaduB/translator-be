import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TranslateService } from './translate.service';

@Controller('translate')
export class TranslateController {
  constructor(private translateService: TranslateService) {}

  @UseGuards(JwtAuthGuard)
  @Get('projects')
  async getProjects() {
    return this.translateService.readStoragePath();
  }

  @Get('projects/:project')
  async getProject(@Param('project') project: string) {
    return this.translateService.readStoragePath(`${project}/`);
  }

  @Get('projects/:project/lang')
  async readFile(@Param('project') project: string, @Query('name') fileName: string) {
    return this.translateService.readFileFromStorage(project, fileName);
  }
}
