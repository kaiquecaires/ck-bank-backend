import { ITransaction } from "../dtos/ITransaction";

export interface ITransactionRepository {
  createTransaction: (transaction: Omit<ITransaction,'id'>) => Promise<ITransaction>
  findTransaction: (id: string) => Promise<ITransaction>
}
