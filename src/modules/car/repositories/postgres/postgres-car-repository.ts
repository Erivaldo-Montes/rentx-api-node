import { prisma } from '@/lib/prisma'
import { Car, Prisma } from '@prisma/client'
import { ListCarsDTO } from '../../DTOs/list-cars-dto'
import { UpdateCarDTO } from '../../DTOs/update-car-dto'
import type { ICarsRepository } from '../ICars-repository'

export class PostgresCarsRepository implements ICarsRepository {
  async create({
    name,
    brand,
    about,
    daily_rate,
    license_plate,
    category_id,
  }: Omit<Prisma.CarCreateInput, 'available'>): Promise<Car> {
    const car = await prisma.car.create({
      data: {
        name,
        brand,
        daily_rate,
        license_plate,
        available: true,
        about,
        category_id,
      },
    })

    return car
  }

  async findByLicensePlate(license_plate: string): Promise<Car | null> {
    return await prisma.car.findFirst({
      where: {
        license_plate,
      },
    })
  }

  async findById(id: string): Promise<Car | null> {
    return await prisma.car.findFirst({
      where: {
        id,
      },
      include: {
        Specifications: true,
      },
    })
  }

  async update({
    id,
    name,
    brand,
    about,
    daily_rate,
    category_id,
    available,
  }: UpdateCarDTO): Promise<Car> {
    return await prisma.car.update({
      where: {
        id,
      },
      data: {
        name,
        brand,
        about,
        daily_rate,
        category_id,
        available,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.specification.deleteMany({
      where: {
        car_id: id,
      },
    })

    await prisma.car.delete({
      where: {
        id,
      },
    })
  }

  async list({ page }: ListCarsDTO): Promise<Car[]> {
    const itemByPage = 20
    return await prisma.car.findMany({
      where: {},
      take: itemByPage,
      skip: (page - 1) * itemByPage,
    })
  }

  async addImageFilename(image_filename: string, id: string): Promise<void> {
    await prisma.car.update({
      where: {
        id,
      },
      data: {
        images_filenames: {
          push: image_filename,
        },
      },
    })
  }

  async removeImage(image_filename: string, car_id: string): Promise<void> {
    await prisma.$queryRaw`
      UPDATE cars 
      SET images_filenames = ARRAY_REMOVE(images_filenames, ${image_filename})
      WHERE id = ${car_id} 
    `
  }
}
