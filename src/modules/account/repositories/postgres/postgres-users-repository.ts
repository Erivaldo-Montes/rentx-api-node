import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../IUsers-repository'

export class PostgresUsersRepository implements IUsersRepository {
  async create({name, email, driver_license,password}: Prisma.UserCreateInput): Promise<Omit<User,'password' | 'role'>> {
    const userCreated = await prisma.user.create({
      data: {
        name,
        email,
        driver_license,
        password
      },
      select: {
        id: true,
        name: true,
        email: true,
        driver_license: true,
        avatar: true,
        created_at: true,
      }

    })

    return userCreated
  }

  async findByEmail(email: string): Promise<Omit<User, 'password'| 'role'> | null> {
    return await prisma.user.findFirst({
      where: {
        email
      },
      select: {
        id: true,
        name: true,
        email: true,
        driver_license: true,
        avatar: true,
        created_at: true,
      }
    })
  }

  async findByDriverLicense(driver_license: string): Promise<Omit<User, 'password' | 'role'> | null> {
    return await prisma.user.findFirst({
      where: {
        driver_license
      },
      select: {
        id: true,
        name: true,
        email: true,
        driver_license: true,
        avatar: true,
        created_at: true,
      }
    })
  }
}