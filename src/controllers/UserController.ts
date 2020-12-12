import { Request, Response } from 'express';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { TokenProvider } from '../providers/TokenProvider/implementations/TokenProvider';
import { IUserRepository } from '../repositories/IUserRepository';
import { CreateSessionService } from '../services/implementations/CreateSessionService';
import { CreateUserService } from '../services/implementations/CreateUserService';

export class UserController {
  private userRepository: IUserRepository;
  private hashProvider: IHashProvider;

  constructor(
    userRepository: IUserRepository,
    hashProvider: IHashProvider
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async createAccount(req: Request, res: Response) {  
    try {
      const createUserService = new CreateUserService(
        this.userRepository,
        this.hashProvider
      );
      const response = await createUserService.execute(req.body);
      res.send(response);
    } catch(error) {
      res.status(error.statusCode).send(error);
    }
  }

  public async createSession(req: Request, res: Response) {
    try {
      const tokenProvider = new TokenProvider();
      const createSessionService = new CreateSessionService(
        this.userRepository,
        tokenProvider,
        this.hashProvider
      );
      const response = await createSessionService.execute(req.body);
      res.send(response);
    } catch(error) {
      res.status(error.statusCode).send(error);
    }
  }
}
