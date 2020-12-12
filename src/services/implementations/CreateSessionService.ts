import { classToClass } from 'class-transformer';
import { IUser } from "../../dtos/IUser";
import { AppError } from "../../errors/AppError";
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from "../../providers/TokenProvider/models/ITokenProvider";
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
  private tokenProvider: ITokenProvider;
  private hashProvider: IHashProvider;

  constructor(
    userRepository: IUserRepository,
    tokenProvider: ITokenProvider,
    hashProvider: IHashProvider
  ) {
    this.userRepository = userRepository;
    this.tokenProvider = tokenProvider;
    this.hashProvider = hashProvider;
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

    const verifyPassword = await this.hashProvider.compareHash(password, user.password);

    if(!verifyPassword) {
      throw new AppError("Incorrect e-mail/password");
    }

    const token = await this.tokenProvider.generateToken(user.id);

    return {
      user: classToClass(user),
      token,
    }
  }
}
