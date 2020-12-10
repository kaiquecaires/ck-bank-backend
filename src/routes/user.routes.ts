import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController'; 
import { UserRepository } from '../typeorm/repositories/implementations/UserRepository';

const userRoutes = Router();


const userControllerFactory = (): UserController => {
  const userRepository = new UserRepository();
  return new UserController(userRepository);
}

userRoutes.post('/createAccount' , (req: Request, res: Response) => {
  userControllerFactory().createAccount(req, res);
});

userRoutes.post('/createSession', (req: Request, res: Response) => {
  userControllerFactory().createSession(req, res);
});


export default userRoutes;
