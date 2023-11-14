import { Car, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { ICarsRepository } from '../ICars-repository'

export class InMemoryCarRepository implements ICarsRepository {
  cars: Car[] = []

  async create(data: Prisma.CarCreateInput): Promise<Car> {
    const car: Car = {
      id: data.id ?? randomUUID(),
      name: data.name,
      about: data.about ?? null,
      brand: data.brand,
      category_id: data.category_id,
      created_at: new Date(),
      daily_rate: data.daily_rate,
      license_plate: data.license_plate,
     }

    this.cars.push(car)
    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.license_plate === license_plate)

    if (!car) {
      return null
    }

    return car
  }

  async findById(id: string): Promise<Car | null> {
    const car = this.cars.find(car => car.id === id)

    if(!car){
      return null
    }

    return car

  }
}
