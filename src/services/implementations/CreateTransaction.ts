import { AppError } from "../../errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  id_receiver: string,
  id_payer: string,
  value: number
}

export class CreateTransaction {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(transactionData: IRequest): Promise<boolean> {
    const requiredFields = ['id_receiver', 'id_payer', 'value'];

    for(const field of requiredFields) {
      if(!transactionData[field]) {
        throw new AppError(`Missing param: ${field}`);
      }
    }

    const response = await this.userRepository.updateBalance(
      transactionData.id_receiver,
      transactionData.value,
      transactionData.id_payer
    );

    return response;
  }
}
