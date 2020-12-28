import { AppError } from "../../errors/AppError";

interface IRequest {
  id: string,
  id_provider: string,
  value: number
}

export class CreateTransaction {
  public async execute(transactionData: IRequest): Promise<any> {
    const requiredFields = ['id', 'id_provider', 'value'];

    for(const field of requiredFields) {
      if(!transactionData[field]) {
        throw new AppError(`Missing param: ${field}`);
      }
    }
  }
}
