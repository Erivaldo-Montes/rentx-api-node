import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository'
import { CreateUserUseCase } from './create-user-use-case'
import { UserNotExistError } from './errors/user-not-exist-error'
import { GetUserProfileUseCase } from './get-user-profile-use-case'

let getUserProfileUseCase: GetUserProfileUseCase
let usersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase

describe('get user profile', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(usersRepository)
    getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  })

  it('Should be possible get user profile', async () => {
    const user = await createUserUseCase.execute({
      name: 'Jhon doe',
      email: 'jhon@email.com',
      driver_license: '12212',
      password: '234442',
    })

    const profile = await getUserProfileUseCase.execute(user.id)

    expect(profile.id).toEqual(user.id)
  })

  it('Should not be possible get non-existing user profile', async () => {
    await expect(() => {
      return getUserProfileUseCase.execute('id')
    }).rejects.toBeInstanceOf(UserNotExistError)
  })
})
