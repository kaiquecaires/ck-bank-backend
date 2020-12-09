import { Request, Response } from 'express';
import { CreateUserService } from '../services/implementations/CreateUserService';

export class User {
  async createAccount(req: Request, res: Response) {
    const createUserService = new CreateUserService();
    const response = await createUserService.execute();
    res.send(response);
  }
}
