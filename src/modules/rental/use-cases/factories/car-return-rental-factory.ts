import { PostgresCarsRepository } from '@car/repositories/postgres/postgres-car-repository'
import { PostgresRentalsRepository } from '@rental/repositories/postgres/postgres-rentals-repository'
import { ReturnCarUseCase } from '../car-return-use-case'

export function makeCarReturnRentalUseCase(): ReturnCarUseCase {
  const carsRepository = new PostgresCarsRepository()
  const rentalsRepository = new PostgresRentalsRepository()
  const returnCarUseCase = new ReturnCarUseCase(
    rentalsRepository,
    carsRepository,
  )

  return returnCarUseCase
}
