import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Gifts } from 'src/gifts/entities/gifts.entity';
import { UserItem } from 'src/users/entities/useritem.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Items extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  type: string;

  @Column()
  @IsString()
  data: string;

  @Column()
  @IsNumber()
  point: number;

  @OneToMany((type) => UserItem, (useritem) => useritem.item, {
    nullable: true,
  })
  userItems: UserItem[];

  @OneToMany((type) => Gifts, (gift) => gift.img, {
    nullable: true,
  })
  giftImages: Gifts[];

  @OneToMany((type) => Gifts, (gift) => gift.svg, {
    nullable: true,
  })
  giftSvgs: Gifts[];
}
