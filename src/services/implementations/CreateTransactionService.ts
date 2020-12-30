import { ITransaction } from "../../dtos/ITransaction";
import { AppError } from "../../errors/AppError";
import { ITransactionRepository } from "../../repositories/ITransactionRepository";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  id_receiver: string,
  id_payer: string,
  value: number
}

export class CreateTransactionService {
  private userRepository: IUserRepository;
  private transactionRepository: ITransactionRepository;

  constructor(userRepository: IUserRepository, transactionRepository: ITransactionRepository) {
    this.userRepository = userRepository;
    this.transactionRepository = transactionRepository;
  }

  public async execute(transactionData: IRequest): Promise<ITransaction[]> {
    const requiredFields = ['id_receiver', 'id_payer', 'value'];

    for(const field of requiredFields) {
      if(!transactionData[field]) {
        throw new AppError(`Missing param: ${field}`);
      }
    }

    const { id_payer, value, id_receiver } = transactionData

    const response = await this.userRepository.updateBalance(
      id_payer,
      value,
      'outcome',
    );

    const response2 = await this.userRepository.updateBalance(
      id_receiver,
      value,
      'income',
    );

    if (response && response2) {
      const outcome = await this.transactionRepository.createTransaction({
        id_user: id_payer,
        transaction_date: new Date().toUTCString(),
        type: 'outcome',
        value
      });

      const income = await this.transactionRepository.createTransaction({
        id_user: id_payer,
        transaction_date: new Date().toUTCString(),
        type: 'income',
        value
      });

      return [income, outcome]
    } else {
      throw new AppError('Error on transaction!')
    }
  }
}
