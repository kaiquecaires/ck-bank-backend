import { User } from '../../../dtos/User';
import { UserRepository } from '../../../repositories/UserRepository';

export class FakeUserRepository implements UserRepository {
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
