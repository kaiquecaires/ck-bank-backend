import { FakeUserRepository } from "../../typeorm/repositories/fakes/FakeUserRepository";
import { FakeHashProvider } from '../../providers/HashProvider/Fakes/FakeHashProvider';
import { CreateUserService } from "../implementations/CreateUserService";

describe('CreateUser', () => {
  let fakeUserRepository: FakeUserRepository;
  let fakeHashProvider: FakeHashProvider;
  let createUserService: CreateUserService;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
  });

  it('should be able create a user', async () => {
      await createUserService.execute({
        email: 'teste@teste.com',
        name: 'kaique caires',
        password: '123456'
      });

      const user = await fakeUserRepository.findByEmail('teste@teste.com');

      expect(user.name).toBe('kaique caires');
  });
});
