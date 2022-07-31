import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { GiftsModule } from './gifts/gifts.module';
import { ItemsModule } from './items/items.module';
import { JwtModule } from './jwt/jwt.module';
import { AuthModule } from './auth/auth.module';
import { Users } from './users/entities/users.entity';
import { UserItem } from './users/entities/useritem.entity';
import { Items } from './items/entities/items.entity';
import { Gifts } from './gifts/entities/gifts.entity';

@Module({
  //.env설정해야함. 관련 라이브러리 깔아야함
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: process.env.NODE_ENV !== 'prod',
      logging: true,
      //참조할 엔티티
      entities: [Users, UserItem, Items, Gifts],
    }),
    UsersModule,
    GiftsModule,
    ItemsModule,
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes(UsersController);
  }
}
