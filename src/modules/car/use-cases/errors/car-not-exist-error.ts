export class CarNotExistError extends Error {
  constructor() {
    super('Car not exist.')
  }
}
