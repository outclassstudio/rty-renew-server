import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthUserInput } from 'src/users/dtos/user-profile.dto';
import { Users } from 'src/users/entities/users.entity';
import { GetMyGiftOutput } from './dtos/get-mygift.dto';
import { SendGiftInput, SendGiftOutput } from './dtos/send-gift';
import { UpdateGiftInput, UpdateGiftOutput } from './dtos/update-gift.dto';
import { GiftsService } from './gifts.service';

@Controller('gifts')
export class GiftsController {
  constructor(private readonly giftsService: GiftsService) {}

  //내 선물 불러오기
  @Get()
  getMyGift(@AuthUser() user: AuthUserInput): Promise<GetMyGiftOutput> {
    return this.giftsService.getMyGift(user);
  }

  //남 선물 불러오기
  @Get('/:id')
  getOthersGift(@Param('id') id: number): Promise<GetMyGiftOutput> {
    return this.giftsService.getOthersGift(id);
  }

  //선물 변경사항 저장(타입 및 위치)
  @Patch()
  updateGift(
    @AuthUser() user: AuthUserInput,
    @Body() updateGfitInput: UpdateGiftInput,
  ): Promise<UpdateGiftOutput> {
    return this.giftsService.updateGift(user, updateGfitInput);
  }

  //특정 선물 삭제
  @Delete('/:giftid')
  deleteGift(@Param('giftid') giftId: number) {
    return this.giftsService.deleteGift(giftId);
  }

  //선불 보내기
  @Post()
  sendGift(
    @AuthUser() user: AuthUserInput,
    @Body() sendGiftInput: SendGiftInput,
  ): Promise<SendGiftOutput> {
    return this.giftsService.sendGift(user, sendGiftInput);
  }

  //내가 보낸 선물 조회
  @Get('/sent')
  getSentGift(@AuthUser() user: AuthUserInput) {
    return this.giftsService.getSentGift(user);
  }
}
