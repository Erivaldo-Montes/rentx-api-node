import { IStorageProvider } from '@/shared/provider/storage/IStorageProvider'
import { IUsersRepository } from '@account/repositories/IUsers-repository'
import { MultipartFile } from '@fastify/multipart'
import { UserNotExistError } from './errors/user-not-exist-error'

interface IRequest {
  avatar_file: MultipartFile
  user_id: string
}

export class UpdateAvatarUseCase {
  constructor(
    private storageProvider: IStorageProvider,
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ avatar_file, user_id }: IRequest) {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new UserNotExistError()
    }

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, 'avatar')
    }

    if (!avatar_file.filename) {
      await this.usersRepository.updateAvatar(user_id, null)
      return
    }

    const avatarFilename = await this.storageProvider.save(
      avatar_file,
      'avatar',
    )
    await this.usersRepository.updateAvatar(user_id, avatarFilename)
  }
}
