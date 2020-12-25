import { IHashProvider } from '../../providers/HashProvider/models/IHashProvider';
import { ITokenProvider } from '../../providers/TokenProvider/models/ITokenProvider';
import { IUserRepository } from '../../repositories/IUserRepository';
import { FakeUserRepository } from '../../typeorm/repositories/fakes/FakeUserRepository';
import { FakeTokenProvider } from '../../providers/TokenProvider/Fakes/FakeTokenProvider';
import { FakeHashProvider } from '../../providers/HashProvider/Fakes/FakeHashProvider';
import { CreateSessionService } from '../implementations/CreateSessionService';
import { CreateUserService } from '../implementations/CreateUserService';

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
});
