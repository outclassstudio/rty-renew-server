import { CoreOutput } from 'src/common/dtos/output.dto';

export class LoginInput {
  userId: string;
  pwd: string;
}

export class LoginOutput extends CoreOutput {
  token?: string;
}
