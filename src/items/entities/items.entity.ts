import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Items extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  type: string;

  @Column()
  @IsString()
  data: string;

  @Column()
  @IsNumber()
  svg: number;
}
