import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'
import { IUsersRepository } from '../IUsers-repository'

export class InMemoryUsersRepository implements IUsersRepository {
  users: User[] = []

  async create({
    name,
    email,
    password,
    driver_license,
  }: Prisma.UserCreateInput): Promise<Omit<User, 'password' | 'role'>> {
    const user: User = {
      id: randomUUID(),
      name,
      email,
      avatar: null,
      password,
      driver_license,
      role: 'USER',
      created_at: new Date(),
    }

    this.users.push(user)

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      driver_license: user.driver_license,
      created_at: user.created_at,
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByDriverLicense(
    driver_license: string,
  ): Promise<Omit<User, 'password' | 'role'> | null> {
    const user = this.users.find(
      (item) => item.driver_license === driver_license,
    )

    if (!user) {
      return null
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      driver_license: user.driver_license,
      created_at: user.created_at,
    }
  }
}
