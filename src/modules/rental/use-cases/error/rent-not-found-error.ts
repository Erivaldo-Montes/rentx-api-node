export class RentNotFoundError extends Error {
  constructor() {
    super('Rent not found.')
  }
}
