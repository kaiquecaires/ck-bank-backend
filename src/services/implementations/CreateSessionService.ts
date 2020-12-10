import { IUser } from "../../dtos/IUser";
import { AppError } from "../../errors/AppError";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IResponse {
  token: string;
  user: IUser;
}

interface IRequest {
  email: string;
  password: string;
}

export class CreateSessionService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    if(!email) {
      throw new AppError("Missing email");
    }

    if(!password) {
      throw new AppError("Missing password");
    }

    const user = await this.userRepository.findByEmail(email);

    if(!user) {
      throw new AppError('User does not exists');
    }

    if(user.password !== password) {
      throw new AppError("Incorrect e-mail/password");
    }

    return {
      user,
      token: 'teste'
    }
  }
}
