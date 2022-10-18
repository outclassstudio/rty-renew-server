import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { Items } from 'src/items/entities/items.entity';
import { JwtService } from 'src/jwt/jwt.service';
import { Raw, Repository } from 'typeorm';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import {
  AuthUserInput,
  ChangePwdInput,
  FindRandomUserOutput,
  FindUserOutput,
  UserInfoOutput,
  UserProfileInput,
} from './dtos/user-profile.dto';
import { UserItem } from './entities/useritem.entity';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly users: Repository<Users>,
    @InjectRepository(UserItem)
    private readonly userItems: Repository<UserItem>,
    @InjectRepository(Items) private readonly items: Repository<Items>,
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
      const theme = await this.items.findOne({ where: { id: 5 } });
      const user = await this.users.save(
        this.users.create({ userId, pwd, nickname, birth, theme }),
      );
      const freeItem = await this.items.find({ where: { point: 0 } });
      freeItem.forEach(async (item) => {
        await this.userItems.save(this.userItems.create({ user, item }));
      });
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
    { userInfo: { id } }: AuthUserInput,
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
  //!jwt토큰 미들웨어에서 사용하므로, 건드리지 말아야 함
  async findById(id: number): Promise<UserInfoOutput> {
    try {
      const userInfo = await this.users.findOne({
        where: { id },
        relations: ['userItems', 'fromGifts', 'toGifts', 'theme'],
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
      const userInfo = await this.users.findOne({
        where: { userId: userId },
        relations: ['theme'],
      });
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
  async findByOtherUserId(id: number): Promise<UserInfoOutput> {
    try {
      const userInfo = await this.users.findOne({
        where: { id },
        relations: ['theme'],
      });
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

  //아이디 또는 닉네임으로 사람 찾기
  async findUser(userId: string): Promise<FindUserOutput> {
    try {
      const userInfo = await this.users.find({
        where: [
          { userId: Raw((user) => `${user} ILIKE '%${userId}%'`) },
          { nickname: Raw((nickname) => `${nickname} ILIKE '%${userId}%'`) },
        ],
        select: {
          id: true,
          userId: true,
          nickname: true,
          birth: true,
          theme: {
            data: true,
          },
        },
        relations: ['theme'],
      });
      console.log('----------', userInfo);
      if (!userInfo) {
        return {
          ok: false,
          error: '찾으시는 유저가 없어요',
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

  async changeTheme(
    { userInfo: { id } }: AuthUserInput,
    themeId: number,
  ): Promise<CoreOutput> {
    try {
      const user = await this.users.findOne({ where: { id } });
      if (!user) {
        return {
          ok: false,
          error: '유저를 찾을 수 없어요',
        };
      }
      const theme = await this.items.findOne({ where: { id: themeId } });
      if (!theme) {
        return {
          ok: false,
          error: '테마를 찾을 수 없어요',
        };
      }
      user.theme = theme;
      await this.users.save(user);
      return {
        ok: true,
        message: '테마가 변경되었어요',
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
  async deleteAccount({
    userInfo: { id },
  }: AuthUserInput): Promise<CoreOutput> {
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

  //랜덤유저추처
  async findRandomUser(): Promise<FindRandomUserOutput> {
    try {
      let entityLength = await this.users.count();
      if (entityLength > 4) {
        entityLength = 4;
      }
      //! 쿼리빌더 사용법 정리
      let userInfo = await this.users
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.theme', 'item')
        .orderBy('RANDOM()')
        .limit(entityLength)
        .getMany();

      if (userInfo.length === 0) {
        return {
          ok: false,
          error: '유저 정보가 없어요',
        };
      }
      return { ok: true, userInfo };
    } catch (error) {
      console.log(error);
      return {
        ok: false,
        error: '유저 정보를 불러오는 중에 문제가 생겼어요',
      };
    }
  }
}
