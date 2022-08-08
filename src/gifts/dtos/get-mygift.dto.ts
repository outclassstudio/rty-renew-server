import { CoreOutput } from 'src/common/dtos/output.dto';
import { Gifts } from '../entities/gifts.entity';

export class GetMyGiftOutput extends CoreOutput {
  gift?: Gifts[];
}
