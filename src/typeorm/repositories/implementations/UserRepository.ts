import { User } from '../../../dtos/User';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { getRepository } from 'typeorm';

export class UserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public async createAccount({ email, password }: Omit<User, 'id'>): Promise<User> {

    const user = {
      email,
      password,
      id: 'random id'
    };

    this.users.push(user);

    return new Promise(resolve => resolve(user));
  }
}
