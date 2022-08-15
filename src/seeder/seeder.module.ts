import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from 'src/app.module';
import { Items } from 'src/items/entities/items.entity';
import { ItemsModule } from 'src/items/items.module';
import { ItemsService } from 'src/items/items.service';
import { JwtService } from 'src/jwt/jwt.service';
import { UserItem } from 'src/users/entities/useritem.entity';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { SeederService } from './seeder.service';

@Module({
  // imports: [AppModule, ItemsModule],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
