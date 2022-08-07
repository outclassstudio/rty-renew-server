import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

//가드 적용은 보류
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    //미들웨어에서 request에 user를 생성하는 것을 기준으로 통과여부를 결정한다
    const user = context.switchToHttp().getRequest()['user'];
    console.log('이건 왜됨?', user);
    if (!user) {
      return false;
    }
    return true;
  }
}
