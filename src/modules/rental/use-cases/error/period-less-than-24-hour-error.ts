export class PeriodLessThan24HourError extends Error {
  constructor() {
    super('rental period less than 24 hours.')
  }
}
