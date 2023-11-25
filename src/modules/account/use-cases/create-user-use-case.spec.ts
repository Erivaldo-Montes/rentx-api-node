import { InMemoryUsersRepository } from '@account/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserUseCase } from './create-user-use-case'
import { UserAlreadyExists } from './errors/user-already-exist-error'

let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe('create user use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
  })

  it('Should be possible to create a new user', async () => {
    const user = {
      name: 'Jhon',
      email: 'jhon@email.com',
      password: 'password',
      driver_license: '23313331',
    }

    const userCreated = await createUserUseCase.execute(user)

    expect(userCreated.id).toEqual(expect.any(String))
  })

  it('Should not be possible to create two user with same email', async () => {
    await createUserUseCase.execute({
      name: 'Jhon',
      email: 'jhon@email.com',
      driver_license: '121212',
      password: 'password',
    })

    await expect(() => {
      return createUserUseCase.execute({
        name: 'Bob',
        email: 'jhon@email.com',
        driver_license: '12331',
        password: 'password',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExists)
  })

  it('Should not be possible to create two users with same driver license', async () => {
    await createUserUseCase.execute({
      name: 'Jhon',
      email: 'jhon@email.com',
      driver_license: '123',
      password: 'password',
    })

    await expect(() => {
      return createUserUseCase.execute({
        name: 'Bob',
        email: 'bob@email.com',
        driver_license: '123',
        password: 'password',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExists)
  })
})
