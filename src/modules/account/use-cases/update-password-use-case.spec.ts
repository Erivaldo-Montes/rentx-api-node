import { InMemoryUsersRepository } from '@account/repositories/in-memory/in-memory-users-repository'
import { compare, hash } from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'
import { PasswordIncorrectError } from './errors/password-incorrect-error'
import { UpdatePasswordUseCase } from './update-password-use-case'

let updatePasswordUseCase: UpdatePasswordUseCase
let usersRepository: InMemoryUsersRepository

describe('Update password', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    updatePasswordUseCase = new UpdatePasswordUseCase(usersRepository)
  })

  it('Should be possible to change user password', async () => {
    const user = await usersRepository.create({
      name: 'Jhon',
      email: 'jhon@email.com',
      driver_license: '123456',
      password: await hash('password', 8),
    })

    await updatePasswordUseCase.execute({
      currentPassword: 'password',
      newPassword: 'change_password',
      user_id: user.id,
    })

    const userSelected = usersRepository.users.find(
      (item) => item.id === user.id,
    )

    const passwordIsChanged = await compare(
      'change_password',
      userSelected!.password,
    )
    expect(passwordIsChanged).toBeTruthy()
  })

  it('Should not be possible to change the user password if the current password is incorrect', async () => {
    const user = await usersRepository.create({
      name: 'Jhon',
      email: 'jhon@email.com',
      driver_license: '123456',
      password: await hash('password', 8),
    })

    await expect(() => {
      return updatePasswordUseCase.execute({
        currentPassword: 'wrong_password',
        newPassword: 'change_password',
        user_id: user.id,
      })
    }).rejects.toBeInstanceOf(PasswordIncorrectError)
  })
})
