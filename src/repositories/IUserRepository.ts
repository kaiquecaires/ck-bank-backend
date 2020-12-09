import { User } from '../dtos/User';

export interface IUserRepository {
  createAccount(user: Omit<User, 'id'>): Promise<User>;
}
