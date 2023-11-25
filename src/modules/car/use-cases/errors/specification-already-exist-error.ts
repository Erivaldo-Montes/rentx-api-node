export class SpecificationAlreadyExistError extends Error {
  constructor() {
    super('Specification already exist.')
  }
}
