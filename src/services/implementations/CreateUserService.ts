import { User } from "../../dtos/User";
import { AppError } from "../../errors/AppError";
import { UserRepository } from "../../repositories/UserRepository";

export class CreateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
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
