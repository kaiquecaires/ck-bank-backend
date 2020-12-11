import jwt from 'jsonwebtoken';
import { ITokenProvider } from "../models/ITokenProvider";

export class TokenProvider implements ITokenProvider {
  public async generateToken(id: string): Promise<string> {
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: '1d',
    });

    return token;
  }
}
