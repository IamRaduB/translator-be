import { Injectable, Logger } from '@nestjs/common';
import { StorageService } from './storage.service';
import { GetFilesOptions } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TranslateService {
  log: Logger = new Logger('TranslateService');
  constructor(
    private storageService: StorageService,
    private configService: ConfigService,
  ) {}

  async readStoragePath(prefix?: string) {
    let options: GetFilesOptions | undefined;
    if (prefix) {
      options = {
        delimiter: '/',
        prefix,
      };
    }
    const contents = await this.storageService.listBucket(
      this.configService.get('storage.bucketName'),
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

  async readFileFromStorage(project: string, fileName: string) {
    try {
      const res = await this.storageService.readFile(
        this.configService.get('storage.bucketName'),
        `${project}/${fileName}`,
      );
      return JSON.parse(res.toString());
    } catch (e) {
      this.log.error(`Unable to read file ${fileName}`, e.stack);
      return null;
    }
  }
}
