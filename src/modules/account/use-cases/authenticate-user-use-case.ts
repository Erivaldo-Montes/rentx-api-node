import { AuthenticateUserRequestDTO } from '@account/DTOs/authenticate-user-request-dto'
import { User } from '@prisma/client'
import { compare } from 'bcrypt'
import { IUsersRepository } from '../repositories/IUsers-repository'
import { AuthenticateError } from './errors/authenticate-error'

export class AuthenticateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUserRequestDTO): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AuthenticateError()
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AuthenticateError()
    }

    return user
  }
}
