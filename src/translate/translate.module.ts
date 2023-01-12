import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { TranslateController } from './translate.controller';
import { TranslateService } from './translate.service';

@Module({
  providers: [StorageService, TranslateService],
  controllers: [TranslateController],
})
export class TranslateModule {}
