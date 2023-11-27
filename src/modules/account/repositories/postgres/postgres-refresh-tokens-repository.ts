import { prisma } from '@/lib/prisma'
import { Prisma, RefreshToken } from '@prisma/client'
import { IRefreshTokensRepository } from '../IRefresh-tokens-repository'
export class PostgresRefreshTokensRepository
  implements IRefreshTokensRepository
{
  async create({
    user_id,
    expires_in,
    token,
  }: Prisma.RefreshTokenUncheckedCreateInput): Promise<RefreshToken> {
    return await prisma.refreshToken.create({
      data: {
        user_id,
        expires_in,
        token,
      },
    })
  }

  async delete(user_id: string): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: {
        user_id,
      },
    })
  }
}
