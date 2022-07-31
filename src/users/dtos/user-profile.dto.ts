import { CoreOutput } from 'src/common/dtos/output.dto';
import { Users } from '../entities/users.entity';

export type UserProfileInput = Partial<
  Pick<Users, 'nickname' | 'birth' | 'theme' | 'point' | 'msg'>
>;

export class UserProfileOutput extends CoreOutput {
  data?: Users;
}

export class ChangePwdInput {
  pwd: string;
}
