import { Car, Prisma } from '@prisma/client'

export interface ICarsRepository {
  create: (car: Prisma.CarCreateInput) => Promise<Car>
  findByLicensePlate: (license_plate: string) => Promise<Car | null>
  findById(id: string): Promise<Car | null>
}
