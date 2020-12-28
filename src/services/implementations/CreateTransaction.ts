import { AppError } from "../../errors/AppError";

export class CreateTransaction {
  public async execute(transactionData: any): Promise<any> {
    const requiredFields = ['id', 'id_provider', 'value'];

    for(const field of requiredFields) {
      if(!transactionData[field]) {
        throw new AppError(`Missing param: ${field}`);
      }
    }
  }
}
