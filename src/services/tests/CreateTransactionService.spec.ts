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
    createTransaction = new CreateTransaction(
      userRepository
    );
  });

  it('should not be able to make a transaction between users if id_receiver is not provided', async () => {
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
        id_receiver: '',
        id_payer: user2.id,
        value: 100
      });
    } catch(error) {
      err = error;
    } finally {
      expect(err).toEqual(new AppError('Missing param: id_receiver'));
    }
  });

  it('should not be able to make a transaction between users if id_payer is not provided', async () => {
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
        id_receiver: user2.id,
        id_payer: '',
        value: 100
      });
    } catch(error) {
      err = error;
    } finally {
      expect(err).toEqual(new AppError('Missing param: id_payer'));
    }
  });

  it('should not be able to make a transaction between users if value is not provided', async () => {
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

    const [user1, user2] = await Promise.all([promiseUser1, promiseUser2]);

    let err = null;

    try {
      await createTransaction.execute({
        id_receiver: user1.id,
        id_payer: user2.id,
        value: null,
      });
    } catch(error) {
      err = error;
    } finally {
      expect(err).toEqual(new AppError('Missing param: value'));
    }
  });

  it('should be able to make a transaction between users', async () => {
    const user1 = await createUserService.execute({
      email: 'teste1@teste.com',
      name: 'kaique caires',
      password: '123456'
    });

    const user2 = await createUserService.execute({
      email: 'teste2@teste.com',
      name: 'kaique caires',
      password: '123456'
    });

    const response = await createTransaction.execute({
      id_receiver: user1.id,
      id_payer: user2.id,
      value: 1000,
    });

    expect(response).toBeTruthy()
  });
});
