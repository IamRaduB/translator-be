import { Injectable, Logger } from '@nestjs/common';
import { StorageService } from './storage.service';
import { GetFilesOptions } from '@google-cloud/storage';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Translation } from './entities/translation.entity';
import { Repository } from 'typeorm';
import { Approval } from './entities/approval.entity';
import { UserService } from '../user/user.service';
import { JwtUser } from '../auth/jwt.dto';

@Injectable()
export class TranslateService {
  log: Logger = new Logger('TranslateService');
  constructor(
    private storageService: StorageService,
    private configService: ConfigService,
    private userService: UserService,
    @InjectRepository(Translation)
    private translationRepository: Repository<Translation>,
    @InjectRepository(Approval)
    private approvalRepository: Repository<Approval>,
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
        `${project}/${fileName}.json`,
      );
      return JSON.parse(res.toString());
    } catch (e) {
      this.log.error(`Unable to read file ${fileName}`, e.stack);
      return null;
    }
  }

  async getTranslation(project: string, name: string) {
    try {
      return await this.translationRepository.findOneBy({
        project,
        language: name,
      });
    } catch (e) {
      this.log.error(`Unable to query contents for project ${project}`, e);
      throw e;
    }
  }

  async createTranslation(
    auth: JwtUser,
    project: string,
    name: string,
    content: string,
  ) {
    const user = await this.userService.findOneByUsername(auth.username);
    const translation = new Translation();
    translation.project = project;
    translation.language = name;
    translation.payload = content;
    translation.editor = user;
    translation.createdAt = new Date();
    return this.translationRepository.save(translation);
  }

  async approveTranslation(auth: JwtUser, content: Translation) {
    const user = await this.userService.findOneByUsername(auth.username);
    const approval = new Approval();
    approval.approvedOn = new Date();
    approval.approver = user;
    content.approval = approval;
    await this.translationRepository.save(content);
  }

  async writeFileToStorage(project: string, fileName: string, content: string) {
    try {
      await this.storageService.writeFile(
        this.configService.get('storage.bucketName'),
        `${project}/${fileName}.json`,
        content,
      );
    } catch (e) {
      this.log.error(
        `Unable to write file ${`${project}/${fileName}.json`} to bucket ${this.configService.get(
          'storage.bucketName',
        )}`,
        e,
      );
      throw e;
    }
  }
}
