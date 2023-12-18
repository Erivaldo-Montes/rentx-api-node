import { IUsersRepository } from '@account/repositories/IUsers-repository'
import bcrypt from 'bcrypt'
import { PasswordIncorrectError } from './errors/password-incorrect-error'
import { UserNotExistError } from './errors/user-not-exist-error'

interface IRequest {
  currentPassword: string
  user_id: string
  newPassword: string
}

export class UpdatePasswordUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    currentPassword,
    newPassword,
    user_id,
  }: IRequest): Promise<void> {
    const userIsExisting = await this.usersRepository.findById(user_id)

    // check if user existing
    if (!userIsExisting) {
      throw new UserNotExistError()
    }

    // check if password is correct
    const password_match = await bcrypt.compare(
      currentPassword,
      userIsExisting.password,
    )

    if (!password_match) {
      throw new PasswordIncorrectError()
    }

    // update password
    const newPasswordHash = await bcrypt.hash(newPassword, 8)

    await this.usersRepository.updatePassword({
      user_id,
      newPassword: newPasswordHash,
    })
  }
}
