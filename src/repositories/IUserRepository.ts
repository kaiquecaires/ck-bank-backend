import { IUser } from '../dtos/IUser';

export interface IUserRepository {
  createUser(user: Omit<IUser, 'id'>): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
}
