import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '../../providers/TokenProvider/models/ITokenProvider';
import { IUserRepository } from '../../repositories/IUserRepository';
import { FakeUserRepository } from '../../typeorm/repositories/fakes/FakeUserRepository';
import { FakeTokenProvider } from '../../providers/TokenProvider/Fakes/FakeTokenProvider';
import { FakeHashProvider } from '../../providers/HashProvider/Fakes/FakeHashProvider';
import { CreateSessionService } from '../implementations/CreateSessionService';
import { CreateUserService } from '../implementations/CreateUserService';
import { AppError } from '../../errors/AppError';

describe('CreateSession', () => {
  let createSessionService: CreateSessionService;
  let userRepository: IUserRepository;
  let tokenProvider: ITokenProvider;
  let hashProvider: IHashProvider;
  let createUserService: CreateUserService;

  beforeEach(() => {
    userRepository = new FakeUserRepository();
    tokenProvider = new FakeTokenProvider();
    hashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      userRepository,
      hashProvider
    );
    createSessionService = new CreateSessionService(
      userRepository,
      tokenProvider,
      hashProvider
    );
  });

  it('should be able create a session', async () => {
    const user = {
      email: 'teste@teste.com',
      name: 'kaique caires',
      password: '123456'
    }

    await createUserService.execute(user);

    const response = await createSessionService.execute({
      email: 'teste@teste.com',
      password: '123456'
    });

    expect(response.user).toHaveProperty('id');
  });

  it('should be able ensure the hash provider was called', async () => {
    jest.spyOn(hashProvider, 'compareHash').mockImplementationOnce(async () => {
      return true;
    });

    const user = {
      email: 'teste@teste.com',
      name: 'kaique caires',
      password: '123456'
    }

    await createUserService.execute(user);

    await createSessionService.execute({
      email: 'teste@teste.com',
      password: '123456'
    });

    expect(hashProvider.compareHash).toHaveBeenCalledWith('123456', user.password);
  });

  it('should not be able create a session without e-mail', async () => {
    let err = undefined;

    try {
      const user = {
        email: 'teste@teste.com',
        name: 'kaique caires',
        password: '123456'
      }
  
      await createUserService.execute(user);
  
      await createSessionService.execute({
        email: '',
        password: '123456'
      });
    } catch (e) {
      err = e;
    } finally {
      expect(err).toBeInstanceOf(AppError);
    }
  });

  it('should not be able create a session without password', async () => {
    let err = undefined;

    try {
      const user = {
        email: 'teste@teste.com',
        name: 'kaique caires',
        password: '123456'
      }
  
      await createUserService.execute(user);
  
      await createSessionService.execute({
        email: 'teste@teste.com',
        password: ''
      });
    } catch (e) {
      err = e;
    } finally {
      expect(err).toBeInstanceOf(AppError);
    }
  });
});
