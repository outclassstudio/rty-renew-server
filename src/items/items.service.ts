import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoreOutput } from 'src/common/dtos/output.dto';
import { AuthUserInput, UserInfoOutput } from 'src/users/dtos/user-profile.dto';
import { UserItem } from 'src/users/entities/useritem.entity';
import { Users } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { BuyItemInput, BuyItemOutput } from './dtos/buy-item.dto';
import { GetItemOutput, GetMyItemOutput } from './dtos/get-item.dto';
import { Items } from './entities/items.entity';
import { ItemsSeed } from './items.data';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items) private readonly items: Repository<Items>,
    @InjectRepository(Users) private readonly users: Repository<Users>,
    @InjectRepository(UserItem) private readonly userItem: Repository<UserItem>,
    private readonly usersService: UsersService,
  ) {
    this.create();
  }

  async create(): Promise<CoreOutput> {
    try {
      ItemsSeed.map(async (item) => {
        const find = await this.items.findOne({ where: { name: item.name } });
        if (find) {
          return false;
        }
        await this.items.save(this.items.create(item));
      });
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

  async getAllItems(): Promise<GetItemOutput> {
    try {
      const items = await this.items.find({ order: { id: 'ASC' } });
      return {
        ok: true,
        items,
      };
    } catch (error) {
      return {
        ok: false,
        error: '데이터를 불러올 수 없어요',
      };
    }
  }

  async getMyItems(user: UserInfoOutput): Promise<GetMyItemOutput> {
    try {
      console.log('---------------왜그러냐', user);
      const data = await this.userItem.find({
        where: { user: { id: user.userInfo.id } },
        relations: ['item'],
      });
      const myItems = data.map((el) => el.item);
      return { ok: true, myItems };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async buyItem(
    { userInfo: { id } }: AuthUserInput,
    { itemId }: BuyItemInput,
  ): Promise<BuyItemOutput> {
    try {
      const user = await this.users.findOne({ where: { id } });
      if (!user) {
        return {
          ok: false,
          error: '유저가 존재하지 않아요',
        };
      }
      const item = await this.items.findOne({ where: { id: itemId } });
      if (!item) {
        return {
          ok: false,
          error: '아이템이 존재하지 않아요',
        };
      }
      const point = user.point - item.point;
      await this.usersService.patchUserInfo(
        { ok: true, userInfo: user },
        { point },
      );
      await this.userItem.save(this.userItem.create({ user, item }));
      return {
        ok: true,
        message: '아이템을 성공적으로 구매했어요',
      };
    } catch (error) {
      return {
        ok: false,
        error: '아이템 구매에 실패했어요',
      };
    }
  }
}
