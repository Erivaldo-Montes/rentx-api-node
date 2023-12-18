import { UserWithoutPassword } from '@account/DTOs/user-without-password-dto'
import { IUsersRepository } from '@account/repositories/IUsers-repository'
import { Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
import { DriverLicenseAlreadyInUseError } from './errors/driver-license-already-in-use-error'
import { UserAlreadyExists } from './errors/user-already-exist-error'

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    name,
    email,
    password,
    driver_license,
  }: Prisma.UserCreateInput): Promise<UserWithoutPassword> {
    const userByEmail = await this.usersRepository.findByEmail(email)

    const userByDriverLicense =
      await this.usersRepository.findByDriverLicense(driver_license)

    if (userByEmail) {
      throw new UserAlreadyExists()
    }

    if (userByDriverLicense) {
      throw new DriverLicenseAlreadyInUseError()
    }

    const password_hash = await bcrypt.hash(password, 8)

    const userCreated = await this.usersRepository.create({
      name,
      email,
      password: password_hash,
      driver_license,
    })

    return {
      id: userCreated.id,
      name: userCreated.name,
      email: userCreated.email,
      avatar: userCreated.avatar,
      driver_license: userCreated.driver_license,
      created_at: userCreated.created_at,
      role: userCreated.role,
    }
  }
}
