import { CoreOutput } from 'src/common/dtos/output.dto';
import { Gifts } from '../entities/gifts.entity';

export type UpdateGiftInput = Partial<
  Pick<Gifts, 'id' | 'svg_attr' | 'status'>
>;

export class UpdateGiftOutput extends CoreOutput {
  updatedGift?: Gifts;
}
