import { Prisma, User } from '@prisma/client'
import { UpdatePasswordDTO } from '../DTOs/update-password-dto'

export interface IUsersRepository {
  create({
    name,
    email,
    password,
    driver_license,
  }: Prisma.UserCreateInput): Promise<User>

  findByEmail(name: string): Promise<User | null>

  findByDriverLicense(driver_license: string): Promise<User | null>

  findById(id: string): Promise<User | null>
  updatePassword({ newPassword, user_id }: UpdatePasswordDTO): Promise<void>
  updateAvatar(user_id: string, avatar_filename: string | null): Promise<void>
}
