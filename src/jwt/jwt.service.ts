import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { CONFIG_OPTIONS } from './jwt.constants';
import { JwtModuleOptions } from './jwt.interface';

@Injectable()
export class JwtService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: JwtModuleOptions,
  ) {}
  //토큰생성
  sign(userId: number): string {
    return jwt.sign({ id: userId }, this.options.privateKey);
  }

  //토큰유효성 검사
  verify(token: string) {
    return jwt.verify(token, this.options.privateKey);
  }
}
