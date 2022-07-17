import { IsNumber, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@Entity()
export class Users extends CoreEntity {
  @Column()
  @IsString()
  userId: string;

  @Column()
  @IsString()
  nickname: string;

  @Column()
  @IsString()
  pwd: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  birth: string;

  @Column({ default: 1 })
  @IsNumber()
  @IsOptional()
  theme: number;

  @Column({ default: 0 })
  @IsNumber()
  @IsOptional()
  point: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  msg: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    try {
      this.pwd = await bcrypt.hash(this.pwd, 10);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async checkPassword(inputPwd: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(inputPwd, this.pwd);
      return ok;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
