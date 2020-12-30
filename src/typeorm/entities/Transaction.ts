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
  id_receiver: string;

  @Column({ type: 'varchar' })
  id_payer: string;

  @Column({ type: 'varchar' })
  transaction_data: string;

  @Column({ type: 'float' })
  balance: number;

  @CreateDateColumn({ type: 'date' })
  created_at: Date

  @UpdateDateColumn({ type: 'date' })
  updated_at: Date
}
