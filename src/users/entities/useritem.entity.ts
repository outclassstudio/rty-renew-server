import { CoreEntity } from 'src/common/entities/core.entity';
import { Items } from 'src/items/entities/items.entity';
import { Entity, JoinTable, ManyToOne } from 'typeorm';
import { Users } from './users.entity';

@Entity()
export class UserItem extends CoreEntity {
  @ManyToOne((type) => Users, (user) => user.userItems, { onDelete: 'CASCADE' })
  user: Users;

  @ManyToOne((type) => Items, (item) => item.userItems, { onDelete: 'CASCADE' })
  @JoinTable()
  item: Items;
}
