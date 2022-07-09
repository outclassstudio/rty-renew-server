import { Controller, Get, Post } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  //상점에서 아이템 불러오기
  @Get()
  getAllItems() {}

  //내 아이템 불러오기
  @Get('/:id')
  getMyItems() {}

  //선물 사기 및 포인트 차감
  @Post('/:id')
  buyItems() {}
}
