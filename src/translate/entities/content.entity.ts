import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Approval } from './approval.entity';
import { Rejection } from './rejection.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'json',
  })
  content: string;

  @Column({
    nullable: false,
  })
  project: string;

  @Column({
    nullable: false,
  })
  language: string;

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
