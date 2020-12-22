import { IHashProvider } from '../models/IHashProvider';

export class FakeHashProvider implements IHashProvider {
  public async hashed(password: string): Promise<string> {
    return password;
  }

  public async compareHash(password: string, hashedPassword: string): Promise<boolean> {
    return password === hashedPassword;
  }
}
