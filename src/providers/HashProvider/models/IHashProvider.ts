export interface IHashProvider {
  hashed (password: string): Promise<string>;
  compareHash (password: string, hashedPassword: string): Promise<boolean>;
}
