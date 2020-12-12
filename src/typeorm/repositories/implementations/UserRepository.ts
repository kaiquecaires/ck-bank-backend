import { getRepository, Repository } from 'typeorm';
import { IUser } from '../../../dtos/IUser';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { User as UserEntitie } from '../../entities/User';

export class UserRepository implements IUserRepository {
  private ormRepository: Repository<UserEntitie>;

  private initRepository () {
    this.ormRepository = getRepository(UserEntitie);
  }
  
  public async createUser({ email, password, name }: Omit<IUser, 'id'>): Promise<IUser> {
    this.initRepository();

    const user = this.ormRepository.create({
      email,
      password,
      name
    });

    await this.ormRepository.save(user);

    return user; 
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    this.initRepository();

    const user = await this.ormRepository.findOne({
      where: {
        email,
      }
    });

    return user;
  }

  public async findById(id: string): Promise<IUser | undefined> {
    this.initRepository();

    const user = await this.ormRepository.findOne(id);

    return user;
  }
}
