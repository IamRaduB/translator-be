import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { TranslateModule } from './translate/translate.module';
import { User } from './user/entities/user.entity';
import { Role } from './user/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123admin',
      database: 'translator',
      entities: [User, Role],
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
