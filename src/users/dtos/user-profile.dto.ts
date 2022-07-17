export interface UserProfileInput {
  nickname?: string;
  birth?: string;
  theme?: number;
  point?: number;
  msg?: string;
}

export interface UserProfileOutput {
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

export interface ChangePwdInput {
  pwd: string;
}
