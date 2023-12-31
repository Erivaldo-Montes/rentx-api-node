import { Prisma, Specification } from '@prisma/client'
import { randomUUID } from 'crypto'
import { UpdateSpecificationDTO } from '../../DTOs/update-specification-dto'
import { ISpecificationsRepository } from '../ISpecifications-repository'

export class InMemorySpecificationRepository
  implements ISpecificationsRepository
{
  specifications: Specification[] = []

  async create({
    name,
    description,
    car_id,
  }: Prisma.SpecificationUncheckedCreateInput): Promise<void> {
    const specification: Specification = {
      id: randomUUID(),
      name,
      description,
      car_id,
      created_at: new Date(),
    }

    this.specifications.push(specification)
  }

  async update({
    id,
    name,
    description,
  }: UpdateSpecificationDTO): Promise<void> {
    this.specifications.forEach((item) => {
      if (item.id === id) {
        item.name = name
        item.description = description
      }
    })
  }

  async findByCar(car_id: string, name: string): Promise<Specification | null> {
    const specification = this.specifications.find((item) => {
      if (item.car_id === car_id && item.name === name) {
        return item
      }
      return undefined
    })

    if (!specification) {
      return null
    }

    return specification
  }

  async findById(id: string): Promise<Specification | null> {
    const specification = this.specifications.find((item) => item.id === id)

    if (!specification) {
      return null
    }

    return specification
  }
}
