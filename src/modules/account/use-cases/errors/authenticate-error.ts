export class AuthenticateError extends Error {
  constructor() {
    super('user or email are incorrect')
  }
}
