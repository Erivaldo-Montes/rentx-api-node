import { InMemoryRefreshTokensRepository } from '@account/repositories/in-memory/in-memory-refresh-tokens-repository'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { TokenIsInvalid } from './errors/refresh-token-invalid'
import { RefreshTokenUseCase } from './refresh-token-use-case'

let refreshTokensRepository: InMemoryRefreshTokensRepository
let usersRepository: InMemoryUsersRepository
let refreshTokenUseCase: RefreshTokenUseCase

describe('Refresh token use case', () => {
  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository()
    usersRepository = new InMemoryUsersRepository()

    refreshTokenUseCase = new RefreshTokenUseCase(
      refreshTokensRepository,
      usersRepository,
    )

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be possible to refresh token', async () => {
    const user = await usersRepository.create({
      name: 'Jhon',
      email: 'jhon@email.com',
      driver_license: '123',
      password: '123',
    })

    const refreshToken = await refreshTokensRepository.create({
      token: randomUUID(),
      expires_in: dayjs().add(2, 'day').unix(),
      user_id: user.id,
    })

    vi.setSystemTime(dayjs().add(1, 'day').format('YYYY, MM, DD'))

    const { user_id } = await refreshTokenUseCase.execute(refreshToken.token)

    expect(user_id).toEqual(expect.any(String))
  })

  it('Should not be possible to update the token after the expires period', async () => {
    const user = await usersRepository.create({
      name: 'Jhon',
      email: 'jhon@email.com',
      driver_license: '123',
      password: '123',
    })

    const refreshToken = await refreshTokensRepository.create({
      token: randomUUID(),
      expires_in: dayjs().add(2, 'day').unix(),
      user_id: user.id,
    })

    vi.setSystemTime(dayjs().add(3, 'day').format('YYYY, MM, DD'))

    await expect(() => {
      return refreshTokenUseCase.execute(refreshToken.token)
    }).rejects.toBeInstanceOf(TokenIsInvalid)
  })
})
