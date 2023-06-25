import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const port = configService.get('DATABASE_PORT');
        const connUri =
          configService.get('DATABASE_CONNECTION_PREFIX') +
          '://' +
          configService.get('DATABASE_USER') +
          ':' +
          configService.get('DATABASE_PASSWORD') +
          '@' +
          configService.get('DATABASE_HOST') +
          (port ? ':' + port : '') +
          '/' +
          configService.get('DATABASE_NAME');

        return {
          uri: connUri,
          authSource: configService.get('DATABASE_AUTH_SRC'),
          autoIndex: true,
        };
      },
    }),
    AuthModule,
    AdminUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
