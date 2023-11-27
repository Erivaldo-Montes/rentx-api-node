export class DriverLicenseAlreadyInUse extends Error {
  constructor() {
    super('Driver license already in use')
  }
}
