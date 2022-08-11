import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import {
  ChangePwdInput,
  UserInfoOutput,
  UserProfileInput,
} from './dtos/user-profile.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly users: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}
  //계정 생성을 위한 함수
  async createAccount({
    userId,
    pwd,
    nickname,
    birth,
  }: CreateAccountInput): Promise<CoreOutput> {
    try {
      const exist = await this.users.findOne({
        where: { userId },
      });
      if (exist) {
        return {
          ok: false,
          error: '이미 존재하는 아이디입니다',
        };
      }
      await this.users.save(
        this.users.create({ userId, pwd, nickname, birth }),
      );
      return { ok: true };
    } catch (error) {
      return { ok: false, error: '계정을 생성하지 못했습니다' };
    }
  }

  //로그인 요청을 위한 함수
  async login({ userId, pwd }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.users.findOne({ where: { userId } });
      if (!user) {
        return {
          ok: false,
          error: '존재하지 않는 아이디입니다',
        };
      }
      const checkedPwd = await user.checkPassword(pwd);
      if (!checkedPwd) {
        return {
          ok: false,
          error: '잘못된 비밀번호 입니다',
        };
      }
      //토큰생성
      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token: token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  //비밀번호 체크를 위한 함수
  //?겹치는 부분에 대한 검토 필요
  async checkPassowrd(
    { id }: Users,
    currentPwd: ChangePwdInput,
  ): Promise<CoreOutput> {
    const user = await this.users.findOne({ where: { id } });
    const checkedPwd = await user.checkPassword(currentPwd.pwd);
    if (!checkedPwd) {
      return {
        ok: false,
        error: '잘못된 비밀번호 입니다',
      };
    }
    return {
      ok: true,
    };
  }

  //유저정보수정
  async patchUserInfo(
    { id }: Users,
    userProfile: UserProfileInput,
  ): Promise<CoreOutput> {
    try {
      await this.users.update({ id }, { ...userProfile });
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

  //비밀번호수정
  async changePassoword(
    { id }: Users,
    changePwdInput: ChangePwdInput,
  ): Promise<CoreOutput> {
    try {
      const user = await this.users.findOne({ where: { id } });
      user.pwd = changePwdInput.pwd;
      this.users.save(user);
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

  //db에서 아이디로 찾기
  async findById({ id }: Users): Promise<UserInfoOutput> {
    try {
      const userInfo = await this.users.findOne({
        where: { id },
        relations: ['userItems', 'fromGifts', 'toGifts'],
      });
      return {
        ok: true,
        userInfo,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  //db에서 아이디로 찾기
  async findByUserId(userId: string): Promise<UserInfoOutput> {
    try {
      const userInfo = await this.users.findOne({ where: { userId } });
      if (!userInfo) {
        return {
          ok: false,
          error: '유저정보가 존재하지 않습니다.',
        };
      }
      return {
        ok: true,
        userInfo,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  //db에서 아이디로 찾기
  async checkUserId(userId: string): Promise<CoreOutput> {
    try {
      const findId = await this.users.findOne({ where: { userId } });
      if (findId) {
        return {
          ok: false,
          error: '이미 존재하는 아이디 입니다.',
        };
      }
      return {
        ok: true,
        message: '사용 가능한 아이디 입니다',
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  //계정삭제
  async deleteAccount({ id }: Users): Promise<CoreOutput> {
    try {
      const user = await this.users.findOne({ where: { id } });
      if (!user) {
        return {
          ok: false,
          error: '존재하지 않는 계정입니다',
        };
      }
      this.users.remove(user);
      return {
        ok: true,
        message: '계정이 삭제되었습니다',
      };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error,
      };
    }
  }
}
