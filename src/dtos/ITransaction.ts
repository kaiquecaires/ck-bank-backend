export interface ITransaction {
  id: string;
  id_user: string;
  type: 'income' | 'outcome';
  transaction_date: string;
  value: number
}
