import { UpdateSpecificationUseCase } from '../update-specification-use-case'
import { PostgresSpecificationsRepository } from '@car/repositories/postgres/postgres-specification-repository'

export function makeUpdateSpecificationUseCase(): UpdateSpecificationUseCase {
  const specificationsRepository = new PostgresSpecificationsRepository()
  const updateSpecificationUseCase = new UpdateSpecificationUseCase(
    specificationsRepository,
  )
  return updateSpecificationUseCase
}
