import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetItemOutput } from './dtos/get-item.dto';
import { Items } from './entities/items.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items) private readonly items: Repository<Items>,
  ) {}

  async getAllItems(): Promise<GetItemOutput> {
    try {
      const data = await this.items.find();
      return {
        ok: true,
        data,
      };
    } catch (error) {
      return {
        ok: false,
        error: '데이터를 불러올 수 없어요',
      };
    }
  }
}
