import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123admin',
      database: 'translator',
      entities: [],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    AdminModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
