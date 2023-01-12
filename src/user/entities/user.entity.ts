import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Approval } from '../../translate/entities/approval.entity';
import { Rejection } from '../../translate/entities/rejection.entity';
import { Translation } from '../../translate/entities/translation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    nullable: false,
  })
  password: string;

  @ManyToOne(() => Role, (role) => role.users, {
    cascade: ['insert', 'update'],
  })
  role: Role;

  @OneToMany(() => Translation, (translation) => translation.editor, {
    cascade: ['insert', 'update'],
  })
  changes: Translation[];

  @OneToMany(() => Approval, (approval) => approval.approver, {
    cascade: ['insert', 'update'],
  })
  approvals: Approval[];

  @OneToMany(() => Rejection, (rejection) => rejection.rejecter, {
    cascade: ['insert', 'update'],
  })
  rejections: Rejection[];
}
