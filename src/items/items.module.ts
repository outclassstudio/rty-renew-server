import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Items } from './entities/items.entity';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';

@Module({
  imports: [TypeOrmModule.forFeature([Items])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
