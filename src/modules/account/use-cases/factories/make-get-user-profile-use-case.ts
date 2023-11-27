import { PostgresUsersRepository } from '../../repositories/postgres/postgres-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile-use-case'

export function makeGetUserProfileUseCase(): GetUserProfileUseCase {
  const usersRepository = new PostgresUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getUserProfileUseCase
}
