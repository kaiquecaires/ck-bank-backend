import { CreateTransaction } from '../implementations/CreateTransaction';
import { FakeHashProvider } from '../../providers/HashProvider/Fakes/FakeHashProvider';
import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { IUserRepository } from '../../repositories/IUserRepository';
import { FakeUserRepository } from '../../typeorm/repositories/fakes/FakeUserRepository';
import { CreateUserService } from '../implementations/CreateUserService';
import { AppError } from '../../errors/AppError';

describe('CreateTransaction', () => {
  let userRepository: IUserRepository;
  let hashProvider: IHashProvider;
  let createUserService: CreateUserService;
  let createTransaction: CreateTransaction;

  beforeEach(() => {
    userRepository = new FakeUserRepository();
    hashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      userRepository,
      hashProvider
    );
    createTransaction = new CreateTransaction();
  });

  it('should not be able to make a transaction between users if id is not provided', async () => {
    let promiseUser1 = createUserService.execute({
      email: 'teste1@teste.com',
      name: 'kaique caires',
      password: '123456'
    });
    let promiseUser2 = createUserService.execute({
      email: 'teste2@teste.com',
      name: 'kaique caires',
      password: '123456'
    });

    const [, user2] = await Promise.all([promiseUser1, promiseUser2]);

    let err = null;

    try {
      await createTransaction.execute({
        id_provider: user2.id,
        value: 100
      });
    } catch(error) {
      err = error;
    } finally {
      expect(err).toEqual(new AppError('Missing param: id'));
    }
  });

  it('should not be able to make a transaction between users if id_provider is not provided', async () => {
    let promiseUser1 = createUserService.execute({
      email: 'teste1@teste.com',
      name: 'kaique caires',
      password: '123456'
    });
    let promiseUser2 = createUserService.execute({
      email: 'teste2@teste.com',
      name: 'kaique caires',
      password: '123456'
    });

    const [, user2] = await Promise.all([promiseUser1, promiseUser2]);

    let err = null;

    try {
      await createTransaction.execute({
        id: user2.id,
        value: 100
      });
    } catch(error) {
      err = error;
    } finally {
      expect(err).toEqual(new AppError('Missing param: id_provider'));
    }
  });
})
