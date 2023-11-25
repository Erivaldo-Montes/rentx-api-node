import { User } from '@prisma/client'
import { IUsersRepository } from '../repositories/IUsers-repository'
import { UserNotExistError } from './errors/user-not-exist-error'

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(id: string): Promise<Omit<User, 'password' | 'role'>> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new UserNotExistError()
    }

    return user
  }
}
