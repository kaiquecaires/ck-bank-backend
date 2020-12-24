import { IUser } from "../../dtos/IUser";
import { AppError } from "../../errors/AppError";
import { IHashProvider } from "../../providers/HashProvider/models/IHashProvider";
import { IUserRepository } from "../../repositories/IUserRepository";

export class CreateUserService {
  private userRepository: IUserRepository;
  private hashProvider: IHashProvider;

  constructor(
    userRepository: IUserRepository,
    hashProvider: IHashProvider
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute(user : Omit<IUser, 'id'>): Promise<IUser> {
    const { email, password, name } = user;
    
    const fields = ['email', 'password', 'name'];

    fields.map(field => {
      if(!user[field]) {
        throw new AppError(field);
      }
    });

    const queryEmail = await this.userRepository.findByEmail(email);

    if(queryEmail) {
      throw new AppError("E-mail already exists");
    }
    
    const hashedPassword = await this.hashProvider.hashed(String(password));

    const response = await this.userRepository.createUser(
      { 
        email,
        name,
        password: hashedPassword
      }
    );

    return response;
  }
}
