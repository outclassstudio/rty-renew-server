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
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import {
  ChangePwdInput,
  UserProfileInput,
  UserProfileOutput,
} from './dtos/user-profile.dto';
import { Users } from './entities/users.entity';
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
  @Get()
  GetMyInfo(@AuthUser() user: Users): Promise<UserProfileOutput> {
    return this.usersService.findById(user);
  }

  //남정보 조회
  @Get('/find')
  findOtherInfo(@AuthUser() user: Users) {}

  //테마불러오기
  @Get('/theme')
  getTheme(@AuthUser() user: Users) {}

  //테마포함 유저정보 수정
  @UseGuards(AuthGuard)
  @Patch()
  patchUserInfo(
    @AuthUser() user: Users,
    @Body() userProfile: UserProfileInput,
  ): Promise<CoreOutput> {
    return this.usersService.editProfile(user, userProfile);
  }

  //비번확인
  @UseGuards(AuthGuard)
  @Post('/pwdcheck')
  checkPassowrd(
    @AuthUser() user: Users,
    @Body() currentPwd: ChangePwdInput,
  ): Promise<CoreOutput> {
    return this.usersService.checkPassowrd(user, currentPwd);
  }

  //!비번 수정엔드포인트 수정 요망
  @UseGuards(AuthGuard)
  @Patch('/updatepwd')
  changePassoword(
    @AuthUser() user: Users,
    @Body() changePwdInput: ChangePwdInput,
  ): Promise<CoreOutput> {
    return this.usersService.changePassoword(user, changePwdInput);
  }

  //계정삭제
  @Delete()
  deleteAccount(@AuthUser() user: Users): Promise<CoreOutput> {
    return this.usersService.deleteAccount(user);
  }
}
