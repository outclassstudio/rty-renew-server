import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Users } from 'src/users/entities/users.entity';
import { BuyItemInput, BuyItemOutput } from './dtos/buy-item.dto';
import { GetItemOutput } from './dtos/get-item.dto';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}

  //상점에서 아이템 불러오기
  @Get()
  getAllItems(): Promise<GetItemOutput> {
    return this.itemService.getAllItems();
  }

  //내 아이템 불러오기
  @Get('/my')
  getMyItems(@AuthUser() user: Users): Promise<GetItemOutput> {
    return this.itemService.getMyItems(user);
  }

  //선물 사기 및 포인트 차감
  @Post()
  buyItem(
    @AuthUser() user: Users,
    @Body() buyItemInput: BuyItemInput,
  ): Promise<BuyItemOutput> {
    return this.itemService.buyItem(user, buyItemInput);
  }
}
