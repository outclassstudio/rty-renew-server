import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserItem } from 'src/users/entities/useritem.entity';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { Items } from './entities/items.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Items, Users, UserItem])],
  controllers: [ItemsController],
  providers: [ItemsService, UsersService],
  exports: [ItemsService],
})
export class ItemsModule {}
