export class CarAlreadyExistError extends Error {
  constructor() {
    super('Car already exist.')
  }
}
