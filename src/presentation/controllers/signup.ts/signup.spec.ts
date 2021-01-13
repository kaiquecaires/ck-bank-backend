import { Controller } from '../../protocols/controller'
import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  const makeSut = (): Controller => {
    const signup = new SignUpController()
    return signup
  }

  test('should return 400 if no name is provided', async () => {
    const sut = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)

    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new Error())
  })
})
