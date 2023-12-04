import { PostgresRefreshTokensRepository } from '@account/repositories/postgres/postgres-refresh-tokens-repository'
import { PostgresUsersRepository } from '@account/repositories/postgres/postgres-users-repository'
import { RefreshTokenUseCase } from '../refresh-token-use-case'
export function makeRefreshTokenUseCase(): RefreshTokenUseCase {
  const refreshTokenRepository = new PostgresRefreshTokensRepository()
  const usersRepository = new PostgresUsersRepository()
  const refreshTokenUseCase = new RefreshTokenUseCase(
    refreshTokenRepository,
    usersRepository,
  )

  return refreshTokenUseCase
}
