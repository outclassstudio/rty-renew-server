import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { UserItem } from './useritem.entity';
import { Gifts } from 'src/gifts/entities/gifts.entity';

@Entity()
export class Users extends CoreEntity {
  @Column()
  @IsString()
  userId: string;

  @Column()
  @IsString()
  nickname: string;

  @Column()
  @IsString()
  pwd: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  birth: string;

  @Column({ default: 1 })
  @IsNumber()
  @IsOptional()
  theme: number;

  @Column({ default: 0 })
  @IsNumber()
  @IsOptional()
  point: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  msg: string;

  @OneToMany((type) => UserItem, (userItem) => userItem.user, {
    nullable: true,
  })
  userItems: UserItem[];

  @OneToMany((type) => Gifts, (gift) => gift.userFrom, {
    nullable: true,
  })
  fromGifts: Gifts[];

  @OneToMany((type) => Gifts, (gift) => gift.userTo, {
    nullable: true,
  })
  toGifts: Gifts[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.pwd) {
      try {
        this.pwd = await bcrypt.hash(this.pwd, 10);
      } catch (error) {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(inputPwd: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(inputPwd, this.pwd);
      return ok;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
