import { PostgresUsersRepository } from '@account/repositories/postgres/postgres-users-repository'
import { UpdatePasswordUseCase } from '../update-password-use-case'

export function makeUpdatePasswordUseCase() {
  const usersRepository = new PostgresUsersRepository()
  const updatePasswordUseCase = new UpdatePasswordUseCase(usersRepository)

  return updatePasswordUseCase
}
