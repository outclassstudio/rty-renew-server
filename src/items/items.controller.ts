import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetItemOutput } from './dtos/get-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}

  //상점에서 아이템 불러오기
  @Get()
  @UseGuards(AuthGuard)
  getAllItems(): Promise<GetItemOutput> {
    return this.itemService.getAllItems();
  }

  //내 아이템 불러오기
  @Get('/:id')
  getMyItems() {}

  //선물 사기 및 포인트 차감
  @Post('/:id')
  buyItems() {}
}
