import { CoreOutput } from 'src/common/dtos/output.dto';

export class User {
  id: number;
  userId: string;
  pwd: string;
  nickname: string;
  birth?: string;
  theme: number;
  point: number;
  msg: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserProfileInput {
  nickname?: string;
  birth?: string;
  theme?: number;
  point?: number;
  msg?: string;
}

export class UserProfileOutput extends CoreOutput {
  data?: User;
}

export class ChangePwdInput {
  pwd: string;
}
