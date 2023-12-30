import { PostgresCarsRepository } from '@car/repositories/postgres/postgres-car-repository'
import { GetCarUseCase } from '../get-car-use-case'

export function makeGetCarUseCase() {
  const carsRepository = new PostgresCarsRepository()
  const getCarUseCase = new GetCarUseCase(carsRepository)

  return getCarUseCase
}
