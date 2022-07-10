import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly users: Repository<Users>,
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
        console.log('왜 여기로 빠짐', exist);
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
    } catch (error) {}
  }
}
