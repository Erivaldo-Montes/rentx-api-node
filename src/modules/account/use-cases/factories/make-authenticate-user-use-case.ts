import { PostgresUsersRepository } from '@account/repositories/postgres/postgres-users-repository'
import { AuthenticateUserUseCase } from '@account/use-cases/authenticate-user-use-case'

export function makeAuthenticateUserUseCase(): AuthenticateUserUseCase {
  const usersRepository = new PostgresUsersRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

  return authenticateUserUseCase
}
