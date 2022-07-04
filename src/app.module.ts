import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GiftsModule } from './gifts/gifts.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [UsersModule, GiftsModule, ItemsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
