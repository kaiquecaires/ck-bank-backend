import { 
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('transactions')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  id_user: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  transaction_data: string;

  @Column({ type: 'float' })
  value: number;

  @CreateDateColumn({ type: 'date' })
  created_at: Date

  @UpdateDateColumn({ type: 'date' })
  updated_at: Date
}
