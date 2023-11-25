import { PostgresUsersRepository } from '@account/repositories/postgres/postgres-users-repository'
import { CreateUserUseCase } from '../create-user-use-case'

export function makeCreateUserUseCase(): CreateUserUseCase {
  const usersRepository = new PostgresUsersRepository()
  const createUserUseCase = new CreateUserUseCase(usersRepository)

  return createUserUseCase
}
