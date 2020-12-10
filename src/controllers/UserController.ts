import { Request, Response } from 'express';
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
      res.send(error);
    }
  }

  public async createSession(req: Request, res: Response) {
    try {
      const createSessionService = new CreateSessionService(this.userRepository);
      const response = await createSessionService.execute(req.body);
      res.send(response);
    } catch(error) {
      res.send(error);
    }
  }
}
