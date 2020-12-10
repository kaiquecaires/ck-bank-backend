import { getRepository, Repository } from 'typeorm';
import { User } from '../../../dtos/User';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { User as UserEntitie } from '../../entities/User';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<UserEntitie>;
  
  public async createAccount({ email, password, name }: Omit<User, 'id'>): Promise<User> {
    this.ormRepository = getRepository(UserEntitie);
    const user = this.ormRepository.create({
      email,
      password,
      name
    });

    await this.ormRepository.save(user);

    return user; 
  }
}
