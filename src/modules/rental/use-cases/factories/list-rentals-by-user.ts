import { PostgresRentalsRepository } from '@rental/repositories/postgres/postgres-rentals-repository'
import { ListRentalsByUserUseCase } from '../list-rentals-by-user-use-case'

export function makeListRentalsByUser(): ListRentalsByUserUseCase {
  const rentalsRepository = new PostgresRentalsRepository()
  const listRentalsByUserUseCase = new ListRentalsByUserUseCase(
    rentalsRepository,
  )

  return listRentalsByUserUseCase
}
