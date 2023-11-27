import { Prisma, RefreshToken } from '@prisma/client'

export interface IRefreshTokensRepository {
  create({
    user_id,
    expires_in,
    token,
  }: Prisma.RefreshTokenUncheckedCreateInput): Promise<RefreshToken>

  delete(user_id: string): Promise<void>
}
