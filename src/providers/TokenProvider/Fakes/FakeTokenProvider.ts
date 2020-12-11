import { ITokenProvider } from "../models/ITokenProvider";

export class TokenProvider implements ITokenProvider {
  public async generateToken(id: string): Promise<string> {
    return new Promise(resolve => resolve('fake_token'));
  }
}
