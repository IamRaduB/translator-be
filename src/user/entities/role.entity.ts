import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

export enum UserRoles {
  ADMIN = 'admin',
  EDITOR = 'editor',
  MODERATOR = 'moderator',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    type: 'enum',
    enum: UserRoles,
    default: UserRoles.EDITOR,
  })
  name: UserRoles;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
