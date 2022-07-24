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
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
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
  login(@Body() loginInput: LoginInput): Promise<LoginOutput> {
    return this.usersService.login(loginInput);
  }

  //회원가입요청
  @Post('/signup')
  signUp(@Body() createAccountInput: CreateAccountInput): Promise<CoreOutput> {
    return this.usersService.createAccount(createAccountInput);
  }

  //아이디중복검사
  @Get('/checkid/:userId')
  checkId(@Param('userId') userId: string) {
    return this.usersService.findByUserId(userId);
  }

  //내정보 조회
  @UseGuards(AuthGuard)
  @Get('/:id')
  findMyInfo(@Param('id') id: number): Promise<UserProfileOutput> {
    return this.usersService.findById(+id);
  }

  //남정보 조회
  @Get('/find/:userId')
  findOtherInfo(@Param('id') id: string) {}

  //테마불러오기
  @Get('/theme')
  getTheme() {}

  //테마포함 유저정보 수정
  @UseGuards(AuthGuard)
  @Patch('/:userId')
  patchUserInfo(
    @Param('userId') userId: string,
    @Body() userProfile: UserProfileInput,
  ): Promise<CoreOutput> {
    return this.usersService.editProfile(userId, userProfile);
  }

  //비번확인
  @UseGuards(AuthGuard)
  @Post('/pwdcheck/:userId')
  pwdCheck(
    @Param('userId') userId: string,
    @Body() currentPwd: ChangePwdInput,
  ): Promise<CoreOutput> {
    return this.usersService.checkPwd(userId, currentPwd);
  }

  //!비번 수정엔드포인트 수정 요망
  @UseGuards(AuthGuard)
  @Patch('/updatepwd/:userId')
  pwdUpdate(
    @Param('userId') userId: string,
    @Body() changePwdInput: ChangePwdInput,
  ): Promise<CoreOutput> {
    return this.usersService.changePwd(userId, changePwdInput);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {}
}
