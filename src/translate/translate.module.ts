import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { TranslateController } from './translate.controller';
import { TranslateService } from './translate.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Translation } from './entities/translation.entity';
import { Approval } from './entities/approval.entity';
import { Rejection } from './entities/rejection.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Translation, Approval, Rejection]),
  ],
  providers: [StorageService, TranslateService],
  controllers: [TranslateController],
})
export class TranslateModule {}
