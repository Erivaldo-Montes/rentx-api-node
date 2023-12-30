import { LocalStorageProvider } from '@/shared/provider/storage/local-storage-provider'
import { PostgresUsersRepository } from '@account/repositories/postgres/postgres-users-repository'
import { UpdateAvatarUseCase } from '../update-avatar-use-case'

export function makeUpdateAvatarUseCase() {
  const usersRepository = new PostgresUsersRepository()
  const storage = new LocalStorageProvider()

  const updateAvatarUseCase = new UpdateAvatarUseCase(storage, usersRepository)

  return updateAvatarUseCase
}
