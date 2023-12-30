import { LocalStorageProvider } from '@/shared/provider/storage/local-storage-provider'
import { PostgresUsersRepository } from '@account/repositories/postgres/postgres-users-repository'
import { GetUserAvatarUseCase } from '../get-user-avatar-use-case'

export function makeGetUserAvatarUseCase(): GetUserAvatarUseCase {
  const usersRepository = new PostgresUsersRepository()
  const storage = new LocalStorageProvider()
  const getUserAvatarUseCase = new GetUserAvatarUseCase(
    usersRepository,
    storage,
  )

  return getUserAvatarUseCase
}
