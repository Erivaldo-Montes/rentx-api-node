import { PostgresCarsRepository } from '../../repositories/postgres/postgres-car-repository'
import { ListCarsUseCase } from '../list-cars-use-case'

export function makeListCarsUseCase(): ListCarsUseCase {
  const carsRepository = new PostgresCarsRepository()
  const listCarsUseCase = new ListCarsUseCase(carsRepository)

  return listCarsUseCase
}
