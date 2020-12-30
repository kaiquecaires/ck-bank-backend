import { IUser } from '../dtos/IUser';

export interface IUserRepository {
  createUser(user: Omit<IUser, 'id'>): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | undefined>;
  findById(id: string): Promise<IUser | undefined>;
  updateBalance(id: string, value: number, id_payer: string): Promise<boolean>; 
}
