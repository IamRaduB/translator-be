import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Rejection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  reason: string;

  @Column({
    nullable: false,
    type: 'datetime',
  })
  rejectedOn: Date;

  @ManyToOne(() => User, (user) => user.rejections)
  rejecter: User;
}
