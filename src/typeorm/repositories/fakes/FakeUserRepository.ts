import { IUser } from '../../../dtos/IUser';
import { IUserRepository } from '../../../repositories/IUserRepository';

export class FakeUserRepository implements IUserRepository {
  private users: IUser[];

  constructor() {
    this.users = [];
  }

  public async createUser({ email, password, name }: Omit<IUser, 'id'>): Promise<IUser> {
    const balance = 0;

    const user = {
      email,
      password,
      name,
      balance,
      id: String(Math.random() * 100)
    };

    this.users.push(user);

    return new Promise(resolve => resolve(user));
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = this.users.filter(user => user.email === email);

    return user[0];
  }

  public async findById(id: string): Promise<IUser> {
    const user = this.users.filter(user => user.id === id);

    return user[0];
  }

  public async updateBalance(
    id_user: string,
    value: number,
    type: 'income' | 'outcome'
  ): Promise<boolean> {
    const userIndex = this.users.findIndex(user => user.id === id_user);
    const user = await this.findById(id_user);

    if (user) {
      if (type === 'income') {
        this.users[userIndex].balance = this.users[userIndex].balance + value
      } else {
        this.users[userIndex].balance = this.users[userIndex].balance - value
      }

      return true;
    }

    return false;
  }
}
