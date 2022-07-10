import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Gifts extends CoreEntity {
  @Column()
  @IsString()
  user_from: string;

  @Column()
  @IsString()
  user_to: string;

  @Column()
  @IsNumber()
  img: number;

  @Column()
  @IsNumber()
  svg: number;

  @Column()
  @IsString()
  content: string;

  @Column()
  @IsString()
  status: string;

  @Column()
  @IsString()
  svg_attr: string;
}
