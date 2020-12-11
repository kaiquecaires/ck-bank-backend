import jwt from 'jsonwebtoken';
import { ITokenProvider } from "../models/ITokenProvider";

interface IDecoded {
  id: string
}

export class TokenProvider implements ITokenProvider {
  public async generateToken(id: string): Promise<string> {
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: '1d',
    });

    return `Bearer ${token}`;
  }

  public async validateToken(token: string): Promise<string | undefined> {
    let id = undefined;

    jwt.verify(token, process.env.SECRET, (err, decoded: IDecoded) => {
      if (!err) {
        id = decoded.id;
      }
    });

    return id;
  }
}
