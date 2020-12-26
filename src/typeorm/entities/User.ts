import { 
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'varchar' })
  avatar_url: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'float' })
  balance: number;

  @CreateDateColumn({ type: 'date' })
  created_at: Date

  @UpdateDateColumn({ type: 'date' })
  updated_at: Date
}
