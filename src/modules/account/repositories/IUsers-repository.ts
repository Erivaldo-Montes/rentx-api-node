import { Prisma, User } from "@prisma/client"

export interface IUsersRepository {
  create({name, email, password, driver_license  }: Prisma.UserCreateInput): Promise<Omit<User, 'password' | 'role' >>
  findByEmail(name: string): Promise<User | null>
  findByDriverLicense(driver_license: string): Promise<Omit<User, 'password' | 'role'> | null>
}