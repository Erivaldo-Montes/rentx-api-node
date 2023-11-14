import { Prisma, Specification } from '@prisma/client'

export interface ISpecificationsRepository {
  create: (Specification: Prisma.SpecificationUncheckedCreateInput) => Promise<void>
  update: (id:string, name: string, description: string) => Promise<void>
  findByCar: (car_id: string, name: string) => Promise<Specification | null>
}
