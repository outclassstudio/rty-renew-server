import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import {
  ChangePwdInput,
  UserProfileInput,
  UserProfileOutput,
} from './dtos/user-profile.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //로그인 요청
  @Post('/login')
  login(@Body() loginInput: LoginInput) {
    return this.usersService.login(loginInput);
  }

  //회원가입요청
  @Post('/signup')
  signUp(@Body() createAccountInput: CreateAccountInput) {
    return this.usersService.createAccount(createAccountInput);
  }

  //아이디중복검사
  @Get('/checkid/:id')
  checkId(@Param('id') id: string) {}

  //내정보 조회
  @UseGuards(AuthGuard)
  @Get('/:id')
  async findMyInfo(@Param('id') id: number): Promise<UserProfileOutput> {
    const myInfo = await this.usersService.findById(+id);
    return myInfo;
  }

  //남정보 조회
  @Get('/find/:id')
  findOtherInfo(@Param('id') id: string) {}

  //테마불러오기
  @Get('/theme')
  getTheme() {}

  //테마포함 유저정보 수정
  @UseGuards(AuthGuard)
  @Patch('/:id')
  async patchUserInfo(
    @Param('id') userId: string,
    @Body() userProfile: UserProfileInput,
  ) {
    try {
      await this.usersService.editProfile(userId, userProfile);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  //비번확인
  @Post('/pwdcheck')
  async pwdCheck() {}

  //!비번 수정엔드포인트 수정 요망
  @UseGuards(AuthGuard)
  @Post('/updatepwd/:id')
  async pwdUpdate(
    @Param('id') userId: string,
    @Body() changePwdInput: ChangePwdInput,
  ) {
    try {
      await this.usersService.changePwd(userId, changePwdInput);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {}
}
