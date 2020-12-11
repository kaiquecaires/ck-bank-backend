export interface ITokenProvider {
  generateToken(id: string): Promise<string>;
}
