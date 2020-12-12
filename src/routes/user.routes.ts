import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/UserController'; 
import { auth } from '../middlewares/auth';
import { HashProvider } from '../providers/HashProvider/implementations/HashProvider';
import { UserRepository } from '../typeorm/repositories/implementations/UserRepository';

const userRoutes = Router();


const userControllerFactory = (): UserController => {
  const userRepository = new UserRepository();
  const hashProvider = new HashProvider();
  return new UserController(
    userRepository,
    hashProvider
  );
}

userRoutes.post('/createAccount' , (req: Request, res: Response) => {
  userControllerFactory().createAccount(req, res);
});

userRoutes.post('/createSession', (req: Request, res: Response) => {
  userControllerFactory().createSession(req, res);
});

userRoutes.use(auth);

userRoutes.get('/testeAuth', (req: Request, res: Response) => {
  res.send(req.user);
});


export default userRoutes;
