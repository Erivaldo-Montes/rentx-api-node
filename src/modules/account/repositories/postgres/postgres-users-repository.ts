import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UpdatePasswordDTO } from '../../DTOs/update-password-dto'
import { IUsersRepository } from '../IUsers-repository'

export class PostgresUsersRepository implements IUsersRepository {
  async create({
    name,
    email,
    driver_license,
    password,
  }: Prisma.UserCreateInput): Promise<User> {
    const userCreated = await prisma.user.create({
      data: {
        name,
        email,
        driver_license,
        role: 'USER',
        password,
      },
    })

    return userCreated
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        email,
      },
    })
  }

  async findByDriverLicense(driver_license: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        driver_license,
      },
    })
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findFirst({
      where: {
        id,
      },
    })
  }

  async updatePassword({
    newPassword,
    user_id,
  }: UpdatePasswordDTO): Promise<void> {
    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        password: newPassword,
      },
    })
  }
}
