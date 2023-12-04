export class TokenIsInvalidError extends Error {
  constructor() {
    super('token is invalid')
  }
}
