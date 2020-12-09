import { User } from "../../dtos/User";
import { AppError } from "../../errors/AppError";
import { UserRepository } from "../../repositories/UserRepository";

export class CreateUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async execute(user: Omit<User, 'id'>): Promise<User> {
    const response = await this.userRepository.createAccount(user);
    return response;
  }
}
