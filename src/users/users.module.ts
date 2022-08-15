import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UserItem } from './entities/useritem.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Items } from 'src/items/entities/items.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, UserItem, Items])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
