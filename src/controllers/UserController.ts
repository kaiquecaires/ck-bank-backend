import { Request, Response } from 'express';
import { TokenProvider } from '../providers/TokenProvider/implementations/TokenProvider';
import { IUserRepository } from '../repositories/IUserRepository';
import { CreateSessionService } from '../services/implementations/CreateSessionService';
import { CreateUserService } from '../services/implementations/CreateUserService';

export class UserController {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  public async createAccount(req: Request, res: Response) {  
    try {
      const createUserService = new CreateUserService(this.userRepository);
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
        tokenProvider
      );
      const response = await createSessionService.execute(req.body);
      res.send(response);
    } catch(error) {
      res.status(error.statusCode).send(error);
    }
  }
}
