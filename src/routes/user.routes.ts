import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController'; 
import { FakeUserRepository } from '../typeorm/repositories/fakes/FakeUserRepository';

const userRoutes = Router();

const userRepository = new FakeUserRepository();

const userController = new UserController(userRepository);

userRoutes.post('/createAccount' , (req: Request, res: Response) => {
  userController.createAccount(req, res);
});

export default userRoutes;
