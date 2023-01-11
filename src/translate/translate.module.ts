import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { TranslateController } from './translate.controller';

@Module({
  providers: [StorageService],
  controllers: [TranslateController],
})
export class TranslateModule {}
