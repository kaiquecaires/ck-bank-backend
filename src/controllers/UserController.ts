import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { CreateUserService } from '../services/implementations/CreateUserService';

export class UserController {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
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
}
