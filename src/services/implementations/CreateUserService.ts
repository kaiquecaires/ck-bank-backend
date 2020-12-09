import { User } from "../../dtos/User";
import { AppError } from "../../errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";

export class CreateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: Omit<User, 'id'>): Promise<User> {
    if(!email) {
      throw new AppError("Missing E-mail");
    }

    if(!password) {
      throw new AppError("Missing E-mail");
    }

    const response = await this.userRepository.createAccount({ email, password });
    return response;
  }
}
