import { UpdatePasswordDTO } from '@account/DTOs/update-password-dto'
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
  }: Prisma.UserCreateInput): Promise<User> {
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

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByDriverLicense(driver_license: string): Promise<User | null> {
    const user = this.users.find(
      (item) => item.driver_license === driver_license,
    )

    if (!user) {
      return null
    }

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async updatePassword({
    newPassword,
    user_id,
  }: UpdatePasswordDTO): Promise<void> {
    this.users.forEach((item) => {
      if (item.id === user_id) {
        item.password = newPassword
      }
    })
  }
}
