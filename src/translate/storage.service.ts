import { GetFileOptions, Storage } from '@google-cloud/storage'
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class StorageService {
  log: Logger = new Logger('StorageService');
  storage: Storage;
  constructor() {
    this.storage = new Storage();
  }

  async listBucket(bucketName: string, options?: GetFileOptions) {
    this.log.log(`Loading contents from ${bucketName}`);
    const [files] = await this.storage.bucket(bucketName).getFiles(options);
    return files;
  }

  async readFile(bucketName: string, fileName: string) {
    const file = this.storage.bucket(bucketName).file(fileName);
    return await file.download();
  }

  async writeFile(bucketName: string, filePath: string, contents: any) {
    const file = this.storage.bucket(bucketName).file(filePath);
    try {
      await file.save(JSON.stringify(contents, null, 2));
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}
