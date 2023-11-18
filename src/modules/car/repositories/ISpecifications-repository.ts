import { Prisma, Specification } from '@prisma/client'
import { UpdateSpecificationDTO } from '../DTOs/update-specification-dto'

export interface ISpecificationsRepository {
  create: (Specification: Prisma.SpecificationUncheckedCreateInput) => Promise<void>
  update: ({id, name, description}: UpdateSpecificationDTO) => Promise<void>
  findByCar: (car_id: string, name: string) => Promise<Specification | null>
  findById: (id: string) => Promise<Specification | null>
}
