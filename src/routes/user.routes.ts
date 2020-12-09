import { Router, Request, Response } from 'express';
import { User } from '../controllers/User'; 

const userRoutes = Router();

const user = new User();

userRoutes.post('/createAccount' , user.createAccount);

export default userRoutes;
