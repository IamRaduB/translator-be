import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TranslateService } from './translate.service';
import { Roles } from '../auth/roles.decorator';
import { UserRoles } from '../user/entities/role.entity';
import { RolesGuard } from '../auth/roles.guard';

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

  @Get('projects/:project/:name')
  async readFile(
    @Param('project') project: string,
    @Param('name') fileName: string,
  ) {
    return this.translateService.readFileFromStorage(project, fileName);
  }

  @UseGuards(JwtAuthGuard)
  @Post('projects/:project/:lang')
  async saveTranslation(
    @Param('project') project: string,
    @Param('lang') lang: string,
    @Body() content: string,
    @Request() req,
  ) {
    // await this.translateService.createTranslation(
    //   req.user,
    //   project,
    //   lang,
    //   content,
    // );
    await this.translateService.writeFileToStorage(
        project,
        lang,
        content,
    );
  }

  @Roles(UserRoles.MODERATOR, UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('projects/:project/:lang')
  async approveTranslation(
    @Param('project') project: string,
    @Param('lang') fileName: string,
    @Request() req,
  ) {
    const translation = await this.translateService.getTranslation(
      project,
      fileName,
    );

    if (!translation) {
      throw new NotFoundException(
        `Translation for lang ${fileName} not found for project ${project}`,
      );
    }

    await this.translateService.approveTranslation(req.user, translation);

    await this.translateService.writeFileToStorage(
      project,
      fileName,
      translation.payload,
    );

    return true;
  }
}
