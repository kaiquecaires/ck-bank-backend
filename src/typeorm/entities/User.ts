import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  avatar_url: string;

  @Column({ type: 'varchar' })
  name: string;

  @CreateDateColumn({ type: 'date' })
  created_at: Date

  @UpdateDateColumn({ type: 'date' })
  updated_at: Date
}
