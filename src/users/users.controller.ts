import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //로그인 요청
  @Post('/login')
  login() {}

  //회원가입요청
  @Post('/signup')
  signUp() {}

  //아이디중복검사
  @Get('/checkid/:id')
  checkId(@Param('id') id: string) {}

  //내정보 조회
  @Get('/:id')
  findMyInfo(@Param('id') id: string) {}

  //남정보 조회
  @Get('/find/:id')
  findOtherInfo(@Param('id') id: string) {}

  //테마불러오기
  @Get('/theme')
  getTheme() {}

  //테마포함 유저정보 수정
  @Patch('/users/:id')
  patchUserInfo(@Param('id') id: string) {}

  //비번확인
  @Post('/pwdcheck')
  pwdCheck() {}

  //!비번 수정엔드포인트 수정 요망
  @Post('/updatepwd')
  pwdUpdate() {}

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {}
}
