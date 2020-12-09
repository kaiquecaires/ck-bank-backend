import { User } from '../dtos/User';

export interface UserRepository {
  createAccount(user: Omit<User, 'id'>): Promise<User>;
}
