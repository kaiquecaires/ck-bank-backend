import { User } from '../../../dtos/User';
import { IUserRepository } from '../../../repositories/IUserRepository';

export class FakeUserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  public async createAccount({ email, password, name }: Omit<User, 'id'>): Promise<User> {

    const user = {
      email,
      password,
      name,
      id: 'random id'
    };

    this.users.push(user);

    return new Promise(resolve => resolve(user));
  }
}
