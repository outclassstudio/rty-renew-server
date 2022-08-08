import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from 'src/items/entities/items.entity';
import { Users } from 'src/users/entities/users.entity';
import { Gifts } from './entities/gifts.entity';
import { GiftsController } from './gifts.controller';
import { GiftsService } from './gifts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gifts, Users, Items])],
  controllers: [GiftsController],
  providers: [GiftsService],
})
export class GiftsModule {}
