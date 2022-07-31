import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Items } from 'src/items/entities/items.entity';
import { Users } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Gifts extends CoreEntity {
  @Column()
  @IsString()
  content: string;

  @Column()
  @IsString()
  status: string;

  @Column()
  @IsString()
  svg_attr: string;

  @ManyToOne((type) => Users, (user) => user.fromGifts)
  userFrom: Users;

  @ManyToOne((type) => Users, (user) => user.toGifts)
  userTo: Users;

  @ManyToOne((type) => Items, (item) => item.giftImages)
  img: Items;

  @ManyToOne((type) => Items, (item) => item.giftSvgs)
  svg: Items;
}
