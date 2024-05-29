import { prisma } from '@/lib/prisma'
import { Prisma, Specification } from '@prisma/client'
import type { ISpecificationsRepository } from '../ISpecifications-repository'
import { UpdateSpecificationDTO } from '../../DTOs/update-specification-dto'

export class PostgresSpecificationsRepository
  implements ISpecificationsRepository
{
  async create({
    name,
    description,
    car_id,
  }: Prisma.SpecificationUncheckedCreateInput): Promise<void> {
    await prisma.specification.create({
      data: {
        name,
        description,
        car_id,
      },
    })
  }

  async update({
    id,
    name,
    description,
  }: UpdateSpecificationDTO): Promise<void> {
    await prisma.specification.update({
      where: {
        id,
      },
      data: {
        description,
        name,
      },
    })
  }

  async findByCar(car_id: string, name: string): Promise<Specification | null> {
    return await prisma.specification.findFirst({
      where: {
        car_id,
        name,
      },
    })
  }

  async findById(id: string): Promise<Specification | null> {
    return await prisma.specification.findFirst({
      where: {
        id,
      },
    })
  }
}
