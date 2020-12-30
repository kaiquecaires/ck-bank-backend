import { isConstructorDeclaration } from "typescript";
import { ITransaction } from "../../../dtos/ITransaction";
import { ITransactionRepository } from "../../../repositories/ITransactionRepository";

export class FakeTransactionRepository implements ITransactionRepository {
  private readonly transactions: ITransaction[] = [];

  async createTransaction(transaction: Omit<ITransaction, 'id'>): Promise<ITransaction> {
    const id = String(Math.random() * 100);

    const newTransaction = {
      ...transaction,
      id
    }

    this.transactions.push(newTransaction);

    return newTransaction;
  }

  async findTransaction(id: string): Promise<ITransaction> {
    const transaction = this.transactions.filter(transaction => transaction.id === id);
    return transaction[0];
  }
}
