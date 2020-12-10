import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController'; 
import { UserRepository } from '../typeorm/repositories/implementations/UserRepository';

const userRoutes = Router();

const userRepository = new UserRepository();

const userController = new UserController(userRepository);

userRoutes.post('/createAccount' , (req: Request, res: Response) => {
  userController.createAccount(req, res);
});

export default userRoutes;
