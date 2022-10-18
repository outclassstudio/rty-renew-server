import { CoreOutput } from 'src/common/dtos/output.dto';
import { Users } from '../entities/users.entity';

export type UserProfileInput = Partial<
  Pick<Users, 'nickname' | 'birth' | 'theme' | 'point' | 'msg'>
>;

export class AuthUserInput extends CoreOutput {
  userInfo?: Users;
}

export class UserInfoOutput extends CoreOutput {
  userInfo?: Users;
}

export class FindUserOutput extends CoreOutput {
  userInfo?: Users[];
}

export class ChangePwdInput {
  pwd: string;
}

export class FindRandomUserOutput extends CoreOutput {
  userInfo?: Users[];
}
