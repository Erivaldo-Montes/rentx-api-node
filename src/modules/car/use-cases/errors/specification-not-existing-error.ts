export class SpecificationNotExistingError extends Error {
  constructor() {
    super('Specification not existing.')
  }
}
