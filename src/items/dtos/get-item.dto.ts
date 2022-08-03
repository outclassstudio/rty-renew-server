import { CoreOutput } from 'src/common/dtos/output.dto';
import { Items } from '../entities/items.entity';

export class GetItemOutput extends CoreOutput {
  data?: Items[];
}
