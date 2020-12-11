export interface ITokenProvider {
  generateToken(id: string): Promise<string>;
  validateToken(token: string): Promise<string | undefined>;
}
