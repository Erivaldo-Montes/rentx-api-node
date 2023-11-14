import { prisma } from '@/lib/prisma'
import { Car, Prisma } from '@prisma/client'
import type { ICarsRepository } from '../ICars-repository'

export class PostgresCarsRepository implements ICarsRepository {
  async create ({
    name,
    brand,
    about,
    daily_rate,
    license_plate,
    category_id
  }: Prisma.CarCreateInput): Promise<Car> {
    const car = await prisma.car.create({
      data: {
        name,
        brand,
        daily_rate,
        license_plate,
        about,
        category_id
      }
    })

   return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    const car = await prisma.car.findFirst({
      where: {
        license_plate
      }
    })

    if(!car){
      return null
    }

    return car
  }

  async findById(id: string): Promise<Car | null> {
    const car = await prisma.car.findUnique({
      where: {
        id
      },    
    })

    if(!car){
      return null
    }

    return car
  }
}
