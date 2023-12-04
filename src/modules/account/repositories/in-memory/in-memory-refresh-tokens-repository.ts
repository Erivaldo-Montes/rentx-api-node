import { Prisma, RefreshToken } from '@prisma/client'
import { randomUUID } from 'crypto'
import { IRefreshTokensRepository } from '../IRefresh-tokens-repository'

export class InMemoryRefreshTokensRepository
  implements IRefreshTokensRepository
{
  refreshTokens: RefreshToken[] = []

  async create({
    user_id,
    expires_in,
    token,
  }: Prisma.RefreshTokenUncheckedCreateInput): Promise<RefreshToken> {
    const refreshToken: RefreshToken = {
      id: randomUUID(),
      expires_in,
      token,
      user_id,
    }

    this.refreshTokens.push(refreshToken)

    return refreshToken
  }

  async delete(user_id: string): Promise<void> {
    const refreshTokenWithoutDeleted = this.refreshTokens.filter(
      (item) => item.user_id !== user_id,
    )

    this.refreshTokens = refreshTokenWithoutDeleted
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    const refreshToken = this.refreshTokens.find((item) => item.token === token)

    if (!refreshToken) {
      return null
    }

    return refreshToken
  }
}
