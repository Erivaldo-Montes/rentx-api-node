import { IStorageProvider } from '@/shared/provider/storage/IStorageProvider'
import { IUsersRepository } from '@account/repositories/IUsers-repository'

export class GetUserAvatarUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private storage: IStorageProvider,
  ) {}

  async execute(user_id: string) {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new Error('user')
    }

    if (!user.avatar) {
      return
    }

    const avatarBuffer = this.storage.get(user.avatar, 'avatar')

    return avatarBuffer
  }
}
