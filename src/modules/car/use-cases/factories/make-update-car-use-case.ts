import { PostgresCarsRepository } from '@car/repositories/postgres/postgres-car-repository'
import { UpdateCarUseCase } from '../update-car-use-case'

export function makeUpdateUseCase(): UpdateCarUseCase {
  const carRepository = new PostgresCarsRepository()
  const updateCarUseCase = new UpdateCarUseCase(carRepository)

  return updateCarUseCase
}
