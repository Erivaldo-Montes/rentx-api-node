import { PostgresCarRepository } from '@car/repositories/postgres/postgres-car-repository'
import { CreateCarUseCase } from '../create-car-use-case'

export function makeCreateCarUseCase (): CreateCarUseCase {
  const carRepository = new PostgresCarRepository()
  const createCarUseCase = new CreateCarUseCase(carRepository)

  return createCarUseCase
}
