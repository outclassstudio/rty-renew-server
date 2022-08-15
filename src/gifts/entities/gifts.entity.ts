import { IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Items } from 'src/items/entities/items.entity';
import { Users } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

class SvgAttribute {
  x: number;
  y: number;
  rotation: number;
}

@Entity()
export class Gifts extends CoreEntity {
  @Column({ nullable: true })
  @IsString()
  content?: string;

  @Column({ default: 'new' })
  @IsString()
  status: string;

  @Column({ type: 'json', default: { x: 0, y: 0, rotation: 0 } })
  svgAttr?: SvgAttribute;

  @ManyToOne((type) => Users, (user) => user.fromGifts, {
    onDelete: 'SET NULL',
  })
  userFrom: Users;

  @ManyToOne((type) => Users, (user) => user.toGifts, { onDelete: 'SET NULL' })
  userTo: Users;

  @ManyToOne((type) => Items, (item) => item.giftImages, {
    onDelete: 'CASCADE',
  })
  img: Items;

  @ManyToOne((type) => Items, (item) => item.giftSvgs, { onDelete: 'CASCADE' })
  svg: Items;
}
