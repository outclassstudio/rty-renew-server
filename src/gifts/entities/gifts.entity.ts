import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Items } from 'src/items/entities/items.entity';
import { Users } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

class SvgAttribute {
  position?: {
    x: number;
    y: number;
  };
}

@Entity()
export class Gifts extends CoreEntity {
  @Column({ nullable: true })
  @IsString()
  content?: string;

  @Column({ default: 'box' })
  @IsString()
  status: string;

  @Column({ type: 'json', nullable: true })
  svg_attr?: SvgAttribute;

  @ManyToOne((type) => Users, (user) => user.fromGifts)
  userFrom: Users;

  @ManyToOne((type) => Users, (user) => user.toGifts)
  userTo: Users;

  @ManyToOne((type) => Items, (item) => item.giftImages)
  img: Items;

  @ManyToOne((type) => Items, (item) => item.giftSvgs)
  svg: Items;
}
