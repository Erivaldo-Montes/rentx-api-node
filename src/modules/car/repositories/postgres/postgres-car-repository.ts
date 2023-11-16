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
    return await prisma.car.findFirst({
      where: {
        license_plate
      }
    })
  }

  async findById(id: string): Promise<Car | null> {
    return await prisma.car.findFirst({
      where: {
        id
      },    
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.specification.deleteMany({
      where: {
        car_id: id
      }
    })

    await prisma.car.delete({
      where: {
        id
      }
    })
  }
}
