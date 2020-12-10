import { IUser } from '../../../dtos/IUser';
import { IUserRepository } from '../../../repositories/IUserRepository';

export class FakeUserRepository implements IUserRepository {
  private users: IUser[];

  constructor() {
    this.users = [];
  }

  public async createUser({ email, password, name }: Omit<IUser, 'id'>): Promise<IUser> {

    const user = {
      email,
      password,
      name,
      id: 'random id'
    };

    this.users.push(user);

    return new Promise(resolve => resolve(user));
  }

  public async findByEmail(email: string): Promise<IUser> {
    const user = this.users.filter(user => user.email === email);

    return user[0];
  }
}
