import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ItemsModule } from './items/items.module';
import { ItemsService } from './items/items.service';
import { SeederModule } from './seeder/seeder.module';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  // const appContext = await NestFactory.createApplicationContext(ItemsModule);
  // const seederService = await appContext.get(ItemsService);
  // seederService.create();

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
