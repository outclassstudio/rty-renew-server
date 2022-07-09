import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';

@Controller('gifts')
export class GiftsController {
  //내 선물 불러오기
  @Get('/id')
  getMyGift() {}

  //선물 변경사항 저장(타입 및 위치)
  @Patch('/id')
  updateGift() {}

  //특정 선물 삭제
  @Delete('/id')
  deleteGift() {}

  //선불 보내기
  @Post()
  sendGift() {}

  //내가 보낸 선물 조회
  @Get('/send/id')
  getSentGift() {}
}
