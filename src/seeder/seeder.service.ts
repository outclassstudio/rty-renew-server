import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Items } from 'src/items/entities/items.entity';
import { ItemsService } from 'src/items/items.service';
import { UserItem } from 'src/users/entities/useritem.entity';
import { Users } from 'src/users/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeederService {
  constructor() // private readonly itemsService: ItemsService
  {}
  async seed() {
    // try {
    //   await this.items();
    // } catch (error) {
    //   console.log(error);
    // }
  }
  async createItems() {
    // try {
    //   await this.itemsService.create();
    // } catch (error) {
    //   console.log(error);
    // }
  }
}
