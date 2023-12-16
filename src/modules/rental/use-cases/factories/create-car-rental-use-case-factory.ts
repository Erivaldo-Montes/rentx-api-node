import { PostgresUsersRepository } from '@account/repositories/postgres/postgres-users-repository'
import { PostgresCarsRepository } from '@car/repositories/postgres/postgres-car-repository'
import { PostgresRentalsRepository } from '@rental/repositories/postgres/postgres-rentals-repository'
import { CreateCarRentalUseCase } from '../create-car-rental-use-case'

export function makeCreateCarRentalUseCase(): CreateCarRentalUseCase {
  const rentalRepository = new PostgresRentalsRepository()
  const carsRepository = new PostgresCarsRepository()
  const usersRepository = new PostgresUsersRepository()

  const createCarRentalUseCase = new CreateCarRentalUseCase(
    rentalRepository,
    usersRepository,
    carsRepository,
  )

  return createCarRentalUseCase
}
