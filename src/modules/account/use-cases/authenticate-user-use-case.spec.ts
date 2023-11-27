import { InMemoryRefreshTokensRepository } from '@account/repositories/in-memory/in-memory-refresh-tokens-repository'
import { InMemoryUsersRepository } from '@account/repositories/in-memory/in-memory-users-repository'
import { Prisma } from '@prisma/client'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUserUseCase } from './authenticate-user-use-case'
import { CreateUserUseCase } from './create-user-use-case'
import { AuthenticateError } from './errors/authenticate-error'

let usersRepository: InMemoryUsersRepository
let authenticateUserUseCase: AuthenticateUserUseCase
let createUserUseCase: CreateUserUseCase
let refreshTokenRepository: InMemoryRefreshTokensRepository

describe('Authenticate use case', () => {
  beforeEach(() => {
    refreshTokenRepository = new InMemoryRefreshTokensRepository()
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      refreshTokenRepository,
    )
  })

  it('Should be possible to authenticate user', async () => {
    const user: Prisma.UserCreateInput = {
      name: 'Jhon Doe',
      email: 'jhon@email.com',
      password: 'password',
      driver_license: '123',
    }

    await createUserUseCase.execute(user)

    const userAuthenticated = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(userAuthenticated.user.id).toEqual(expect.any(String))
    expect(userAuthenticated.refresh_token).toEqual(expect.any(String))
  })

  it('Should not be possible to authenticate user if the password is incorrect', async () => {
    const user: Prisma.UserCreateInput = {
      name: 'Jhon Doe',
      email: 'jhon@email.com',
      password: 'password',
      driver_license: '123',
    }

    await createUserUseCase.execute(user)

    await expect(() => {
      return authenticateUserUseCase.execute({
        email: user.email,
        password: '123',
      })
    }).rejects.toBeInstanceOf(AuthenticateError)
  })

  it('Should not be possible to authenticate user if the email is incorrect', async () => {
    const user: Prisma.UserCreateInput = {
      name: 'Jhon Doe',
      email: 'jhon@email.com',
      password: 'password',
      driver_license: '123',
    }

    await createUserUseCase.execute(user)
    await expect(() => {
      return authenticateUserUseCase.execute({
        email: 'email@wrong.com',
        password: user.password,
      })
    }).rejects.toBeInstanceOf(AuthenticateError)
  })
})
