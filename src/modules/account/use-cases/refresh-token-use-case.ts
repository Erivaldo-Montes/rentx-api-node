import dayjs from 'dayjs'
import { IRefreshTokensRepository } from '../repositories/IRefresh-tokens-repository'
import { IUsersRepository } from '../repositories/IUsers-repository'
import { TokenIsInvalid } from './errors/refresh-token-invalid'
import { UserNotExistError } from './errors/user-not-exist-error'

interface IResponse {
  user_id: string
  role: 'ADMIN' | 'USER'
}

export class RefreshTokenUseCase {
  constructor(
    private refreshTokensRepository: IRefreshTokensRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(refresh_token: string): Promise<IResponse> {
    const refreshToken =
      await this.refreshTokensRepository.findByToken(refresh_token)

    if (!refreshToken) {
      throw new TokenIsInvalid()
    }

    const currentDate = dayjs().unix()

    console.log(currentDate)
    if (refreshToken.expires_in < currentDate) {
      throw new TokenIsInvalid()
    }

    const user = await this.usersRepository.findById(refreshToken.user_id)
    if (!user) {
      throw new UserNotExistError()
    }
    console.log(dayjs('2023-12-01').unix())
    return {
      user_id: refreshToken.user_id,
      role: user.role,
    }
  }
}
