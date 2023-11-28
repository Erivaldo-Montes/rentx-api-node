import { Car, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'
import { ListCarsDTO } from '../../DTOs/list-cars-dto'
import { UpdateCarDTO } from '../../DTOs/update-car-dto'
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
    const car = this.cars.find((car) => car.id === id)

    if (!car) {
      return null
    }

    return car
  }

  async update({
    id,
    name,
    about,
    brand,
    category_id,
    daily_rate,
  }: UpdateCarDTO): Promise<Car> {
    this.cars.forEach((item) => {
      if (item.id === id) {
        item.name = name
        item.about = about
        item.brand = brand
        item.category_id = category_id
        item.daily_rate = daily_rate
      }
    })

    return this.cars[
      this.cars.findIndex((element) => {
        if (element.id === id) {
          return element
        }
        return null
      })
    ]
  }

  async delete(car_id: string): Promise<void> {
    const carsWithoutSelected = this.cars.filter((item) => item.id !== car_id)
    this.cars = carsWithoutSelected
  }

  async list({ page }: ListCarsDTO): Promise<Car[]> {
    const itemsPerPage = 2
    return this.cars.slice((page - 1) * itemsPerPage, itemsPerPage * page)
  }
}
