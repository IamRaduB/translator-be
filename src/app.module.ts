import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { TranslateModule } from './translate/translate.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';
import { Content } from './translate/entities/content.entity';
import { Approval } from './translate/entities/approval.entity';
import { Rejection } from './translate/entities/rejection.entity';
import { ConfigModule } from '@nestjs/config';
import constants from './constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [constants],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123admin',
      database: 'translator',
      entities: [User, Role, Content, Approval, Rejection],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    AdminModule,
    TranslateModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
