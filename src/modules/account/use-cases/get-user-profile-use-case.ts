import { UserWithoutPassword } from '@account/DTOs/user-without-password-dto'
import { IUsersRepository } from '../repositories/IUsers-repository'
import { UserNotExistError } from './errors/user-not-exist-error'

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<UserWithoutPassword> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new UserNotExistError()
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      driver_license: user.driver_license,
      role: user.role,
      created_at: user.created_at,
    }
  }
}
