import { env } from '@/config/env'
import { AuthenticateUserRequestDTO } from '@account/DTOs/authenticate-user-request-dto'
import { AuthenticateUserResponseDTO } from '@account/DTOs/autheticate-user-response-dto'
import { compare } from 'bcrypt'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
import { IRefreshTokensRepository } from '../repositories/IRefresh-tokens-repository'
import { IUsersRepository } from '../repositories/IUsers-repository'
import { AuthenticateError } from './errors/authenticate-error'

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private refreshTokensRepository: IRefreshTokensRepository,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserRequestDTO): Promise<AuthenticateUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AuthenticateError()
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AuthenticateError()
    }

    await this.refreshTokensRepository.delete(user.id)

    const expires_in = dayjs()
      .add(env.REFRESH_TOKEN_EXPIRES_IN_DAYS, 'day')
      .unix()

    const token = randomUUID()

    const refreshToken = await this.refreshTokensRepository.create({
      expires_in,
      user_id: user.id,
      token,
    })
    return {
      user,
      refresh_token: refreshToken.token,
    }
  }
}
