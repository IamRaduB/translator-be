import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StorageService } from './storage.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetFilesOptions } from '@google-cloud/storage';
import { ListBucketQuery } from './dto/list-bucket.dto';
import { storageConstants } from '../constants';
import { ReadFileDto } from './dto/read-file.dto';
import { Roles } from '../auth/roles.decorator';
import { UserRoles } from '../user/entities/role.entity';
import { RolesGuard } from '../auth/roles.guard';

@Controller('translate')
export class TranslateController {
  constructor(private storageService: StorageService) {}

  @Roles(UserRoles.ADMIN, UserRoles.EDITOR, UserRoles.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('list')
  async listBucket(@Query() query: ListBucketQuery) {
    const options: GetFilesOptions = {
      prefix: query.folder + '/',
      delimiter: '/',
    };
    const contents = await this.storageService.listBucket(
      storageConstants.bucketName,
      options,
    );
    return contents
      .filter((file) => {
        return options
          ? file.name !== options.prefix
          : !file.name.includes('.');
      })
      .map((file) => {
        let fileName = file.name.substring(0, file.name.length - 1);
        // if it's looking up files in a folder
        if (options) {
          fileName = file.name.substring(
            file.name.lastIndexOf('/') + 1,
            file.name.lastIndexOf('.'),
          );
        }

        return {
          name: fileName,
          path: file.name,
        };
      });
  }

  @Roles(UserRoles.ADMIN, UserRoles.EDITOR, UserRoles.MODERATOR)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('file')
  async readFile(@Query() query: ReadFileDto) {
    try {
      const res = await this.storageService.readFile(
        storageConstants.bucketName,
        query.file as string,
      );
      return JSON.parse(res.toString());
    } catch (e) {
      console.warn(e.message);
      return null;
    }
  }
}
