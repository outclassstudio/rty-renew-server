import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gifts } from './entities/gifts.entity';
import { GiftsController } from './gifts.controller';
import { GiftsService } from './gifts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gifts])],
  controllers: [GiftsController],
  providers: [GiftsService],
})
export class GiftsModule {}
