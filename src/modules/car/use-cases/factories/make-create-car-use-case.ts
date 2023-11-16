import { PostgresCarsRepository } from '@car/repositories/postgres/postgres-car-repository'
import { PostgresCategoriesRepository } from '@car/repositories/postgres/postgres-categories-repository'
import { CreateCarUseCase } from '../create-car-use-case'

export function makeCreateCarUseCase (): CreateCarUseCase {
  const carRepository = new PostgresCarsRepository()
  const categoriesRepository = new PostgresCategoriesRepository()
  const createCarUseCase = new CreateCarUseCase(carRepository, categoriesRepository)

  return createCarUseCase
}
