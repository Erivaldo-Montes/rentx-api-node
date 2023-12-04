export class DriverLicenseAlreadyInUseError extends Error {
  constructor() {
    super('Driver license already in use')
  }
}
