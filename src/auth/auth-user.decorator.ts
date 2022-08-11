import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const user = context.switchToHttp().getRequest()['user'];
    console.log(user, '----유저나오니------');
    return user;
  },
);
