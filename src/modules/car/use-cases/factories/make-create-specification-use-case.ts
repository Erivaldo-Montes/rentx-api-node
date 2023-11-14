import { PostgresCarRepository } from '@car/repositories/postgres/postgres-car-repository'
import { PostgresSpecificationsRepository } from '@car/repositories/postgres/postgres-specification-repository'
import { CreateSpecificationUseCase } from '../create-specification-use-case'

export function makeCreateSpecificationUseCase (): CreateSpecificationUseCase {
  const carsRepository = new PostgresCarRepository()
  const specificationRepository = new PostgresSpecificationsRepository()
  const createCarSpecificationUseCase = new CreateSpecificationUseCase(
    specificationRepository,
    carsRepository
  )

  return createCarSpecificationUseCase
}
