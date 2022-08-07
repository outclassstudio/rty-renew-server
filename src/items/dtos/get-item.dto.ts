import { CoreOutput } from 'src/common/dtos/output.dto';
import { UserItem } from 'src/users/entities/useritem.entity';
import { Items } from '../entities/items.entity';

export class GetItemOutput extends CoreOutput {
  items?: Items[];
}

export class GetMyItemOutput extends CoreOutput {
  myItems?: Items[];
}
