import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

//가드 적용은 보류
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const user = context['user'];
    if (!user) {
      return false;
    }
    return true;
  }
}
