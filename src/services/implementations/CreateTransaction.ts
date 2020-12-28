import { AppError } from "../../errors/AppError";

interface IRequest {
  id_receiver: string,
  id_payer: string,
  value: number
}

export class CreateTransaction {
  public async execute(transactionData: IRequest): Promise<any> {
    const requiredFields = ['id_receiver', 'id_payer', 'value'];

    for(const field of requiredFields) {
      if(!transactionData[field]) {
        throw new AppError(`Missing param: ${field}`);
      }
    }
  }
}
