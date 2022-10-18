import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from 'src/items/entities/items.entity';
import { AuthUserInput } from 'src/users/dtos/user-profile.dto';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';
import { GetMyGiftOutput } from './dtos/get-mygift.dto';
import { SendGiftInput, SendGiftOutput } from './dtos/send-gift';
import { GetSentGiftOutput } from './dtos/sent-gift.dto';
import { UpdateGiftInput, UpdateGiftOutput } from './dtos/update-gift.dto';
import { Gifts } from './entities/gifts.entity';

@Injectable()
export class GiftsService {
  constructor(
    @InjectRepository(Gifts) private readonly gifts: Repository<Gifts>,
    @InjectRepository(Users) private readonly users: Repository<Users>,
    @InjectRepository(Items) private readonly items: Repository<Items>,
  ) {}

  async getMyGift({
    userInfo: { id },
  }: AuthUserInput): Promise<GetMyGiftOutput> {
    try {
      const gift = await this.gifts.find({
        where: { userTo: { id } },
        relations: ['userFrom', 'userTo', 'img', 'svg'],
      });
      if (!gift) {
        return {
          ok: false,
          error: '선물을 찾을 수 없어요',
        };
      }
      return {
        ok: true,
        gift,
      };
    } catch (error) {
      return {
        ok: false,
        error: '선물리스트를 찾을 수 없어요',
      };
    }
  }

  async getOthersGift(id: number): Promise<GetMyGiftOutput> {
    try {
      const gift = await this.gifts.find({
        where: { userTo: { id } },
        relations: ['userFrom', 'userTo', 'img', 'svg'],
      });
      if (!gift) {
        return {
          ok: false,
          error: '선물을 찾을 수 없어요',
        };
      }
      return {
        ok: true,
        gift,
      };
    } catch (error) {
      return {
        ok: false,
        error: '선물리스트를 찾을 수 없어요',
      };
    }
  }

  async updateGift(
    { userInfo: { id } }: AuthUserInput,
    updateGfitInput: UpdateGiftInput,
  ): Promise<UpdateGiftOutput> {
    try {
      const gift = await this.gifts.findOne({
        where: { id: updateGfitInput.id },
      });
      if (!gift) {
        return {
          ok: false,
          error: '선물을 찾을 수 없어요',
        };
      }
      await this.gifts.save({
        id: updateGfitInput.id,
        ...updateGfitInput,
      });
      const updatedGift = await this.gifts.find({
        where: { userTo: { id } },
        relations: ['userFrom', 'userTo', 'img', 'svg'],
      });
      //!수정한 데이터 리턴 여부 확인
      return {
        ok: true,
        updatedGift,
      };
    } catch (error) {
      return {
        ok: false,
        error: '선물을 업데이트 할 수 없어요',
      };
    }
  }

  async deleteGift(giftId: number) {
    try {
      const gift = await this.gifts.findOne({ where: { id: giftId } });
      if (!gift) {
        return {
          ok: false,
          error: '존재하지 않는 선물이네요',
        };
      }
      await this.gifts.remove(gift);
      return {
        ok: true,
        message: '선물이 삭제되었어요',
      };
    } catch (error) {
      return {
        ok: false,
        error: '선물을 삭제할 수 없어요',
      };
    }
  }

  //!100포인트추가
  async sendGift(
    { userInfo: { id } }: AuthUserInput,
    sendGiftInput: SendGiftInput,
  ): Promise<SendGiftOutput> {
    const userFrom = await this.users.findOne({ where: { id } });
    const userTo = await this.users.findOne({
      where: { userId: sendGiftInput.userTo },
    });
    if (!userTo) {
      return {
        ok: false,
        error: '존재하지 않는 유저에요',
      };
    }
    const svg = await this.items.findOne({
      where: { id: sendGiftInput.svgId },
    });
    const img = await this.items.findOne({
      where: { id: sendGiftInput.imgId },
    });
    let content = '';
    if (sendGiftInput.content) {
      content = sendGiftInput.content;
    }
    await this.gifts.save(
      this.gifts.create({
        userTo,
        userFrom,
        svg,
        img,
        content,
      }),
    );
    userFrom.point += 100;
    await this.users.save(userFrom);
    return {
      ok: true,
      message: '선물이 성공적으로 보내졌어요',
    };
  }

  async getSentGift({
    userInfo: { id },
  }: AuthUserInput): Promise<GetSentGiftOutput> {
    try {
      const gift = await this.gifts.find({
        where: { userFrom: { id } },
        relations: ['userFrom', 'userTo', 'img', 'svg'],
      });
      if (!gift) {
        return {
          ok: false,
          error: '선물을 찾지 못했어요',
        };
      }
      return {
        ok: true,
        gift,
      };
    } catch (error) {
      return {
        ok: false,
        error: '보낸 선물을 찾지 못했어요',
      };
    }
  }
}
