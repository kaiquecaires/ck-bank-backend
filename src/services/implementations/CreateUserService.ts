import { IUser } from "../../dtos/IUser";
import { AppError } from "../../errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";

export class CreateUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password, name }: Omit<IUser, 'id'>): Promise<IUser> {
    if(!email) {
      throw new AppError("Missing E-mail");
    }

    if(!password) {
      throw new AppError("Missing E-mail");
    }

    if(!name) {
      throw new AppError("Missing Name");
    }

    const response = await this.userRepository.createUser({ email, password, name });
    return response;
  }
}
