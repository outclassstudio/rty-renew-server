import { CoreOutput } from 'src/common/dtos/output.dto';

export class SendGiftInput {
  userTo: string;
  svgId: number;
  imgId: number;
  content: string;
}

export class SendGiftOutput extends CoreOutput {}
