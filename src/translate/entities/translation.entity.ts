import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn, PrimaryColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Approval } from './approval.entity';
import { Rejection } from './rejection.entity';

@Entity()
export class Translation {
  @PrimaryColumn()
  project: string;

  @PrimaryColumn({
    nullable: false,
  })
  language: string;

  @Column({
    type: 'json',
  })
  payload: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.changes, {
    cascade: ['insert', 'update'],
  })
  editor: User;

  @OneToOne(() => Approval, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  approval: Approval;

  @OneToOne(() => Rejection, {
    cascade: ['insert', 'update'],
  })
  @JoinColumn()
  rejection: Rejection;
}
