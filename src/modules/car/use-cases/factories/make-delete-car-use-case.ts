import { PostgresCarsRepository } from '@car/repositories/postgres/postgres-car-repository'
import { DeleteCarUseCase } from '../delete-car-use-case'

export function makeDeleteCarUseCase(): DeleteCarUseCase {
  const carsRepository = new PostgresCarsRepository()
  const deleteCarUseCase = new DeleteCarUseCase(carsRepository)

  return deleteCarUseCase

}