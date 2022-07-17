import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from 'src/jwt/jwt.service';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import {
  ChangePwdInput,
  UserProfileInput,
  UserProfileOutput,
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
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exist = await this.users.findOne({ where: { userId } });
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
  async login({
    userId,
    pwd,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
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

  //유저정보수정
  async editProfile(userId: string, userProfile: UserProfileInput) {
    return await this.users.update({ userId }, { ...userProfile });
  }

  //비밀번호수정
  async changePwd(userId: string, changePwdInput: ChangePwdInput) {
    const user = await this.users.findOne({ where: { userId } });
    user.pwd = changePwdInput.pwd;
    return this.users.save(user);
  }

  //db에서 아이디로 찾기
  async findById(id: number): Promise<Users> {
    return this.users.findOne({ where: { id } });
  }
}
