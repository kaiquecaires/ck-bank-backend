export class ServerError extends Error {
  constructor (controller: string) {
    super(`Server error: ${controller}`)
    this.name = 'ServerError'
  }
}
