import bcrypt from 'bcrypt';
import { AppError } from '../../../errors/AppError';
import { IHashProvider } from '../models/IHashProvider';

export class HashProvider implements IHashProvider {
  public async hashed(password: string): Promise<string> {
    const hashedPassword = bcrypt.hashSync(password, Number(process.env.SALT));
    return hashedPassword;
  }

  public async compareHash(password: string, hashedPassword: string): Promise<boolean> {
    const passwordVerify = bcrypt.compareSync(password, hashedPassword);

    return passwordVerify;
  }
}
